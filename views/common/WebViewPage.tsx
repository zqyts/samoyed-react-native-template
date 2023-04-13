import React, { useLayoutEffect } from 'react'
import { WebView } from 'react-native-webview'
import { RouteComponentProps } from 'types'

export default function WebViewPage({ route, navigation }: RouteComponentProps) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.data?.title || 'webview'
    })
  }, [navigation, route])
  return <WebView source={{ uri: route.params.data?.url || '' }} />
}
