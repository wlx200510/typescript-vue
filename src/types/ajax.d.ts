declare namespace Ajax {
  // axios 返回数据
  export interface AxiosResponse {
    data: AjaxResponse;
  }

  // 请求接口数据
  export interface AjaxResponse {
    status: number;
    data: any;
    desc: string;
  }
}
