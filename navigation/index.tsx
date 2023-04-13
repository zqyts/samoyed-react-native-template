/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import Themes from '@/constants/Themes'
import {useStore} from '@/models/store'
import {AntDesign, FontAwesome} from '@expo/vector-icons'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer, DefaultTheme, DarkTheme, useFocusEffect} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import * as React from 'react'
import {ColorSchemeName, Pressable} from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
// import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import TabOneScreen from '../screens/TabOneScreen'
import TabTwoScreen from '../screens/TabTwoScreen'
import {RootStackParamList, RootTabParamList, RootTabScreenProps, RouteComponentProps} from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import RouterConfig, {IRouteConf} from './RouterConfig'
// import { navigationRef } from './RootNavigation'

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      // ref={navigationRef}
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      // onStateChange={(state) => console.log('New state is', state)}
    >
      <RootNavigator/>
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function customHeaderConf(item: IRouteConf) {
  if (item.name === 'CameraScanerPage' || item.name === 'ImagePagerViewPage' || item.name === 'SearchPage') {
    return {
      headerShown: false
    }
  } else {
    return {}
  }
}

function RootNavigator() {
  const USER_INFO = useStore((state) => state.USER_INFO)
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {fontSize: 18,fontWeight: 'bold',},
        headerStyle: {
          backgroundColor: Themes.brand_primary,
        },
        headerTintColor: '#fff',
        gestureEnabled: true,
        // headerTintColor: ThemeColors.white,
        // headerStyle: { backgroundColor: ThemeColors.theme }
        animation: 'slide_from_right'
      }}
      // 路由拦截
      screenListeners={({navigation}) => ({
        state: (e: any) => {
          // Do something with the `navigation` object
          const data = e.data.state.routes
          if (!navigation.canGoBack()) {
            // console.log("we're on the initial screen")
          } else {
            if (USER_INFO) {
              // 已登录
            } else {
              const routerItem = RouterConfig.filter(item => item.name === data[data.length - 1].name)[0]
              if (routerItem?.notNeedLogin === true) {
                return
              }
              navigation.replace('Login')
            }
          }
        }
      })}
    >
      <Stack.Screen name='Root' component={BottomTabNavigator} options={{headerShown: false}}/>
      <Stack.Screen name='NotFound' component={NotFoundScreen} options={{title: 'Oops!'}}/>
      <Stack.Group>
        {/* <Stack.Screen name='Modal' component={ModalScreen} /> */}
        {RouterConfig.map((item, index) => (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={item.customHeader ? {...item.options, ...customHeaderConf(item)} : item.options}
          />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()
  return (
    <BottomTab.Navigator
      initialRouteName='TabOne'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerTitleAlign: 'center'
      }}
    >
      <BottomTab.Screen
        name='TabOne'
        component={TabOneScreen}
        options={({navigation}: RootTabScreenProps<'TabOne'>) => ({
          title: '首页',
          tabBarIcon: ({color}) => <TabBarIcon name='home' color={color}/>,
        })}
      />
      <BottomTab.Screen
        name='TabTwo'
        component={TabTwoScreen}
        options={{
          title: '我的',
          tabBarIcon: ({color}) => <TabBarIcon name='user' color={color}/>
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof AntDesign>['name']; color: string }) {
  return <AntDesign size={24} style={{marginBottom: -3}} {...props} />
}
