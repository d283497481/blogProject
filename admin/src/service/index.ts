import NetworkRequest from './request';
import localCatch from '@/utils/cache';

export const networkRequest = new NetworkRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  interceptors: {
    requestInterceptor(config) {
      const token = localCatch.getCache('blog_token');
      if (token) {
        config.headers = { ...config.headers, 'X-Token': token };
      }
      return config;
    }
  }
});
