import { useStore } from '@/models/store'
import {Button, Icon, List, Modal} from '@ant-design/react-native'
import { View, StyleSheet } from 'react-native'
import { RouteComponentProps } from '../../types'
import CommonStyle from '@/constants/CommonStyle'
import Themes from '@/constants/Themes'
export default function AccoutManage({ navigation }: RouteComponentProps) {
  const fetchLogin = useStore((state) => state.fetchLoginOut)
  const goUserLogOff = () => {
    navigation.push('AccountLogoff')
  }
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
    <View style={styles.wrap}>
      <List>
        {/*<List.Item
          extra=''
          arrow='horizontal'
          onPress={goUserLogOff}
          thumb={<Icon name='logout' size='md' color={Themes.brand_primary} style={{ marginRight: 15 }} />}
        >
          用户注销
        </List.Item>*/}
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
  wrap: {
    marginTop: 15
  },
  wrapAction: {
    padding: 15,
    marginTop: 100
  }
})
