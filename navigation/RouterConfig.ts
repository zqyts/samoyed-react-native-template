/*
 * @Author: caih.zhouqiyuan
 * @Date: 2023-02-09 16:40:35
 * @Last Modified by: caih.zhouqiyuan
 * @Last Modified time: 2023-03-10 16:43:50
 * 配置路由表
 */
import Login from '@/views/user/Login'
import Register from '@/views/user/Register'
import AccountManage from '@/views/user/AccoutManage'
import { RootStackParamList } from 'types'
import UserDetailInfo from '@/views/user/UserDetailInfo'
import WebViewPage from '@/views/common/WebViewPage'
import AccountLogoff from '@/views/user/AccountLogoff'
import ListInfiniteScroll from '@/views/common/ListInfiniteScroll'
import TestDemo from '@/views/common/TestDemo'
// 抽检核验
import SpotCheckIndex from '@/views/spotCheck/index'
import SpotCheckEntryCheckResult from '@/views/spotCheck/entryCheckResult'
import SpotCheckEntryCheckResultDetail from '@/views/spotCheck/entryCheckResultDetail'
import GoodsGoodsInfoIndex from '@/views/goods/index'
import GoodsGoodsInfoDetail from '@/views/goods/goodsInfoDetail'
export interface IRouteConf {
  name: keyof RootStackParamList
  component: React.ComponentType<any>
  getComponent?: never
  children?: never
  options?: any
  customHeader?: boolean
  notNeedLogin?: boolean
}

// export const customRightHeader: Partial<Record<keyof RootStackParamList, React.ReactNode>> = {
//   Search: ''
// }
const RouterConfig: IRouteConf[] = [
  {
    name: 'Login',
    component: Login,
    options: { title: '登录' },
    notNeedLogin: true
  },
  {
    name: 'Register',
    component: Register,
    options: { title: '注册' },
    notNeedLogin: true
  },
  {
    name: 'AccountManage',
    component: AccountManage,
    options: { title: '账号管理' }
  },
  {
    name: 'UserDetailInfo',
    component: UserDetailInfo,
    options: { title: '用户信息' }
  },
  {
    name: 'WebViewPage',
    component: WebViewPage,
    options: { title: '协议' }
  },
  {
    name: 'AccountLogoff',
    component: AccountLogoff,
    options: { title: '用户注销' }
  },
  {
    name: 'ListInfiniteScroll',
    component: ListInfiniteScroll,
    options: { title: '分页滚动列表' }
  },
  {
    name: 'TestDemo',
    component: TestDemo,
    options: { title: 'TestDemo' }
  },
  {
    name: 'SpotCheckIndex',
    component: SpotCheckIndex,
    options: { title: '抽检核验' }
  },
  {
    name: 'SpotCheckEntryCheckResult',
    component: SpotCheckEntryCheckResult,
    options: { title: '录入核验结果' }
  },
  {
    name: 'SpotCheckEntryCheckResultDetail',
    component: SpotCheckEntryCheckResultDetail,
    options: { title: '运输工具货物详情' }
  },
  {
    name: 'GoodsGoodsInfoIndex',
    component: GoodsGoodsInfoIndex,
    options: { title: '货物信息' }
  },
  {
    name: 'GoodsGoodsInfoDetail',
    component: GoodsGoodsInfoDetail,
    options: { title: '运输工具货物详情' }
  }
]

export default RouterConfig
