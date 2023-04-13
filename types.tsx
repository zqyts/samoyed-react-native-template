/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

interface RouteParamsList {
  [key: string]: {
    id: string
    data?: Record<string, string>
  }
}
export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  Modal: undefined
  NotFound: undefined
  WebViewPage: { data: Record<string, string> }
  CameraScanerPage: undefined
  ImagePagerViewPage: undefined
  SearchPage: undefined
  Login: undefined
  Register: undefined,
  AccountManage: undefined
  UserDetailInfo: undefined
  AccountLogoff: undefined
  ListInfiniteScroll: undefined
  TestDemo: undefined
  SpotCheckIndex: undefined
  SpotCheckEntryCheckResult: { id: string }
  SpotCheckEntryCheckResultDetail: { id: string }
  GoodsGoodsInfoIndex: undefined
  GoodsGoodsInfoDetail: { id: string }
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>

export type RootTabParamList = {
  TabOne: undefined
  TabTwo: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

// 导航、路由
export type RouteComponentProps = {
  route: RouteProp<RouteParamsList, string>
  navigation: NativeStackNavigationProp<RootStackParamList & RootTabParamList>
}
