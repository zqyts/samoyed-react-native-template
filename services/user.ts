// 查验到场确认http接口
import { UserApi } from '@/config/httpApi'
import httpRequest from './request'
export interface IUserInfo {
  certStatus: string
  idCardNo: string
  mobile: string
  nickname: string
  certTime: string
  faceFlag: boolean
  faceUrl: string
  userId: string
  token: string
  status: string | boolean
  immiName: string
  customsName: string
  customsPlaceName: string
}
export interface ILoginFormValues {
  mobile: string
  validCode: string
}
export interface ILogoutStatus {
  removeApplyTime: string
  removeCoolingTime: string
  removeEndTime: string
  removeFlowStatus: string
  removeFlowStatusName: string
  nickname: string
}
export interface IAccountPwd {
  username: string
  password: string
}
// 登录
export const fetchLogin = async (params: ILoginFormValues) => {
  return httpRequest('POST', UserApi.login, params)
}
// 获取用户信息
export const getBaseUserInfo = async () => {
  return httpRequest('GET', UserApi.getBaseUserInfo)
}
// 退出登录
export const fetchLoginOut = async () => {
  return httpRequest('GET', UserApi.logout)
}
// 发送短信验证码
export const fetchSendSms = async (params: { mobile: string; type: string }) => {
  return httpRequest('POST', UserApi.sendSms, params)
}
// 查询当前用户注销状态
export const queryUserRemoveStatus = async (params = {}) => {
  return httpRequest('GET', UserApi.queryUserRemoveStatus, params)
}
// 提交注销申请
export const fetchLogoutSubmit = async (params: { removeReason: string; userSuggestion: string }) => {
  return httpRequest('POST', UserApi.removeApply, params)
}
// 取消注销
export const fetchLogoutCancel = async (params = {}) => {
  return httpRequest('POST', UserApi.cancelRemove, params)
}
// 确认注销
export const fetchLogoutConfirm = async (params = {}) => {
  return httpRequest('POST', UserApi.confirmRemove, params)
}
