/*
 * @Author: caih.zhouqiyuan
 * @Date: 2023-03-09 16:43:13
 * @Last Modified by: caih.zhouqiyuan
 * @Last Modified time: 2023-03-09 16:43:42
 * @ 公共接口类型定义
 */

export interface IHttpResponse {
  data: any
  code: number
  message: string
  resultFlag: boolean
}
export interface IParamsByPage {
  pageNo: number
  pageSize: number
}
