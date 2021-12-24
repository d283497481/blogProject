import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface INQInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestErrorInterceptor?: (error: any) => any;
  responseInterceptor?: (response: T) => T;
  responseErrorInterceptor?: (error: any) => any;
}

export interface INetworkRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: INQInterceptors<T>;
  showLoading?: boolean;
}
