import { Provider, Toast } from '@ant-design/react-native' // 支持换肤、语言国际化、适配Toast等
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme' // 白天喝暗黑主题，目前没考虑做
import Navigation from './navigation'
import Themes from './constants/Themes'
import APIProvider from './components/ApiProvider'

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    Toast.config({
      mask: false // 是否允许点击穿透
      // stackable: true
    })
    return (
      <SafeAreaProvider>
        <Provider theme={Themes}>
          <APIProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </APIProvider>
        </Provider>
      </SafeAreaProvider>
    )
  }
}
