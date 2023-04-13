/*
 * @Author: caih.zhouqiyuan
 * @Date: 2023-02-09 17:22:25
 * @Last Modified by: caih.zhouqiyuan
 * @Last Modified time: 2023-02-09 20:07:40
 * 提供给不依赖组件的navigation prop使用
 */

import { createNavigationContainerRef } from '@react-navigation/native'
import { RootStackParamList } from 'types'

export const navigationRef = createNavigationContainerRef()

export function navigate(name: keyof RootStackParamList, params?: Record<string, string>) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}
