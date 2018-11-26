import http from 'http';
import https from 'https';
import qs from 'qs';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  baseURL: '/',
  transformResponse: [(data: AxiosResponse) => data],
  paramsSerializer(params: any) {
    return qs.stringify(params);
  },
  timeout: 8000,
  withCredentials: true,
  responseType: 'json',
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxRedirects: 5,
  maxContentLength: 3000,
  validateStatus(status: number) {
    return status >= 200 && status < 300;
  },
  // 用于node.js, 可以删除
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
};

export default axiosConfig;
