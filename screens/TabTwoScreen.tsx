import { useStore } from '@/models/store'
import { ImageBackground, StyleSheet, Image, Pressable, View, Text } from 'react-native'
import {Button, Icon, List, Modal} from '@ant-design/react-native'
import {RootTabScreenProps} from 'types'
import { UserPolicyConf } from '@/constants/UserPolicyConf'
import Themes from '@/constants/Themes'
import CommonStyle from "@/constants/CommonStyle";
export default function TabTwoScreen({ navigation }:  RootTabScreenProps<'TabTwo'>) {
  const USER_INFO = useStore((state) => state.USER_INFO)
  const goUserInfoPage = () => {
    if (USER_INFO) {
      navigation.push('UserDetailInfo')
    } else {
      navigation.push('Login')
    }
  }
  const goAccountManagePage = () => {
    navigation.push('AccountManage')
  }
  const goUserAgreement = () => {
    navigation.push('WebViewPage', { data: { url: UserPolicyConf.userPolicy, title: '用户注册协议' } })
  }
  const goUserPrivacy = () => {
    navigation.push('WebViewPage', { data: { url: UserPolicyConf.privacyPolicy, title: '隐私政策' } })
  }
  const fetchLogin = useStore((state) => state.fetchLoginOut)
  const loginOut = () => {
    Modal.alert('提示', '是否退出登录', [
      {text: '取消', onPress: () => console.log('cancel'), style: 'cancel'},
      {
        text: '确定', onPress: () => fetchLogin(() => {
          navigation.replace('Login')
        })
      }
    ])
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={require('@/assets/images/userbg.png')} resizeMode='cover'>
        <Pressable style={styles.userContainer} onPress={() => goUserInfoPage()}>
          <View style={styles.userWrap}>
            <Image source={require('@/assets/images/avatar.png')} style={styles.avatar} />
            {USER_INFO ? (
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{USER_INFO.nickname}</Text>
                <Text style={styles.mobile}>{USER_INFO.mobile}</Text>
              </View>
            ) : (
              <View style={styles.userInfo}>
                <Text style={styles.userName}>未登录</Text>
              </View>
            )}
          </View>
        </Pressable>
      </ImageBackground>
      <List style={styles.listWrap}>
        {/*<List.Item
          extra=''
          arrow='horizontal'
          onPress={goAccountManagePage}
          style={styles.listItem}
          thumb={<Icon name='user' size='md' color={Themes.brand_primary} style={{ marginRight: 15 }} />}
        >
          账号管理
        </List.Item>*/}
        <List.Item
          extra=''
          arrow='horizontal'
          onPress={goUserAgreement}
          style={styles.listItem}
          thumb={<Icon name='solution' size='md' color={Themes.brand_primary} style={{ marginRight: 15 }} />}
        >
          用户注册协议
        </List.Item>
        <List.Item
          extra=''
          arrow='horizontal'
          onPress={goUserPrivacy}
          style={styles.listItem}
          thumb={<Icon name='file-done' size='md' color={Themes.brand_primary} style={{ marginRight: 15 }} />}
        >
          隐私政策
        </List.Item>
      </List>
      <View style={styles.wrapAction}>
        <Button onPress={() => loginOut()} type='primary' style={CommonStyle.bottomOneHalfBtn}>
          退出登录
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapAction: {
    padding: 15,
    marginTop: 300
  },
  userContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0)'
  },
  userWrap: {
    flexDirection: 'row',
    height: 116,
    alignItems: 'center',
    paddingHorizontal: 12,
    zIndex: 100,
    backgroundColor: 'rgba(255,255,255,0)'
  },
  avatar: {
    marginRight: 12,
    width: 60,
    height: 60
  },
  userInfo: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0)'
  },
  userName: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 9
  },
  mobile:{
    color: '#000000',
    fontSize: 14,
  },
  userStatus: {
    color: '#999999'
  },
  listWrap: {
    marginTop: 15
  },
  listItem:{
    paddingTop: 4,
    paddingBottom: 4
  }
})
