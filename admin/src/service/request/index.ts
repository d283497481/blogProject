import axios, { AxiosInstance } from 'axios';
import { ElLoading, ILoadingInstance, ElNotification } from 'element-plus';
import router from '@/router';
import type { INetworkRequestConfig, INQInterceptors } from './types';
import localCatch from '@/utils/cache';

class NetworkRequest {
  instance: AxiosInstance;
  interceptors?: INQInterceptors;
  showLoading: boolean;
  loading?: ILoadingInstance;

  constructor(config: INetworkRequestConfig) {
    // 创建 axios 实例
    this.instance = axios.create(config);

    // 保存基本信息
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? true;

    // 添加所有实例都有的拦截器，执行顺序
    // 请求拦截器：后添加的先执行
    // 响应拦截器：先添加的先执行
    // 添加实例独有拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestErrorInterceptor
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseErrorInterceptor
    );
    // 添加全局网络请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 判断是否需要开启 loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, .5)'
          });
        }
        return config;
      },
      (error) => {
        return error;
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        this.loading?.close(); // 移除 loading
        return Promise.resolve(response.data);
      },
      (error) => {
        this.loading?.close(); // 移除 loading
        const { response } = error;
        if (response) {
          const { data, status } = response;
          ElNotification({
            title: '响应失败',
            message: data.message ?? data,
            type: 'error'
          });
          if (status === 401) {
            if (router.currentRoute.value.path !== '/login') {
              localCatch.clearCache();
              router.push('/login');
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  request<T>(config: INetworkRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 处理接口独有的请求拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 判断当前请求是否不需要不需要 loading
      if (config.showLoading === false) {
        this.showLoading = false;
      }

      this.instance
        .request<any, T>(config)
        .then((response) => {
          // 处理接口独有的响应拦截器
          if (config.interceptors?.responseInterceptor) {
            response = config.interceptors.responseInterceptor(response);
          }
          // 将 loading 默认置为开启，以免因为一个请求设为关闭而影响后面的请求
          this.showLoading = true;
          resolve(response);
        })
        .catch((error) => {
          // 将 loading 默认置为开启，以免因为一个请求设为关闭而影响后面的请求
          this.showLoading = true;
          reject(error);
        });
    });
  }

  get<T>(config: INetworkRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }

  post<T>(config: INetworkRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }

  delete<T>(config: INetworkRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }

  patch<T>(config: INetworkRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}

export default NetworkRequest;
