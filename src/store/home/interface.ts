/*
 * @Author: wanglixing
 * @Date: 2018-11-26 15:32:38
 * @Last Modified by: wanglixing
 * @Last Modified time: 2018-11-26 15:40:00
 * 主要用于定义home模块中相关模块的接口
 */
export interface HomeContent {
  name: string,
  m1?: boolean
}
export interface State {
  count: number,
  message: string,
  test1?: HomeContent[]
}
