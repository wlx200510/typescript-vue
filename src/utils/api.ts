import axios from 'axios';
import config from './config';
import { AxiosRequestConfig } from 'axios';

// 取消重复请求
const pending: Array<{
  url: string,
  cancel: () => void,
}> = [];
const cancelToken = axios.CancelToken;
const removePending = (axiosConfig: AxiosRequestConfig) => {
  for (const p in pending) {
    if (pending.hasOwnProperty(p)) {
      const item: any = p;
      const list: any = pending[p];
      // 当前请求在数组中存在时执行函数体
      if (list.url === axiosConfig.url + '&' + axiosConfig.method) {
        // 执行取消操作
        list.cancel();
        // 从数组中移除记录
        pending.splice(item, 1);
      }
    }
  }
};

const service = axios.create(config);

// 添加请求拦截器
service.interceptors.request.use(
  (axiosConfig: AxiosRequestConfig) => {
    removePending(axiosConfig);
    axiosConfig.cancelToken = new cancelToken((c) => {
      pending.push({ url: axiosConfig.url + '&request_type=' + axiosConfig.method, cancel: c });
    });
    return axiosConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 返回状态判断(添加响应拦截器)
service.interceptors.response.use(
  (res) => {
    removePending(res.config);
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default service;
