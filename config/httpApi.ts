/*
 * @Author: caih.zhouqiyuan
 * @Date: 2023-02-08 17:36:52
 * @Last Modified by: caih.zhouqiyuan
 * @Last Modified time: 2023-03-09 17:21:02
 */
// 用户模块接口

export const UserApi = {
  login: '/frontier/loginByMobile', // 登录
  getBaseUserInfo: '/frontier/loginUser', // 获取用户基本信息
  logout: '/frontier/logout', // 退出登录
  sendSms: '/send/sendSms', // 发送短信验证码
  queryUserRemoveStatus: '/eapp/userRemove/queryUserRemoveStatus', // 查询当前用户注销状态
  removeApply: '/eapp/userRemove/removeApply', // 注销申请
  confirmRemove: '/eapp/userRemove/confirmRemove', // 确认注销
  cancelRemove: '/eapp/userRemove/cancelRemove' // 取消注销申请
}

// 字典数据
export const DictApi = {
  fetchDictData: '/frontier/dict/queryByType'
}

// 抽检核验模块接口
export const SpotCheckHttpApi = {
  fetchPreEntryListByPage: '/frontier/customsOrder/queryCustomsOrderPage', // 预录入列表
  fetchPreEntryDetailById: '/frontier/customsOrder/queryById',
  fetchPreEntryToCheck: '/frontier/customsOrder/toCheck',
  fetchPreEntryCancelCheck: '/frontier/customsOrder/cancelCheck',
  fetchEntryCheckConfirm: '/frontier/customsOrder/doCheck',
  getCountryList: '/eapp/api-commons/hsHarbour/getCountryList' // 获取国家列表
}
