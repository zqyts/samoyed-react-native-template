import { View, Text } from 'react-native'
import { Icon, List } from '@ant-design/react-native'
import { useStore } from '@/models/store'
import Themes from '@/constants/Themes'
export default function UserDetailInfo() {
  const USER_INFO = useStore((state) => state.USER_INFO)
  return (
    <View>
      <List>
        <List.Item
          extra={USER_INFO?.mobile}
          arrow='empty'
          thumb={<Icon name='user' size='md' color={Themes.brand_primary} style={{ marginRight: 15 }} />}
        >
          用户姓名
        </List.Item>
        <List.Item
          extra={USER_INFO?.idCardNo}
          arrow='empty'
          thumb={<Icon name='idcard' size='md' color={Themes.brand_primary} style={{ marginRight: 15 }} />}
        >
          身份证号
        </List.Item>
        <List.Item
          extra={USER_INFO?.mobile}
          arrow='empty'
          thumb={<Icon name='phone' size='md' color={Themes.brand_primary} style={{ marginRight: 15 }} />}
        >
          手机号
        </List.Item>
        <List.Item
          extra={USER_INFO?.immiName}
          arrow='empty'
          thumb={<Icon name='team' size='md' color={Themes.brand_primary} style={{ marginRight: 15 }} />}
        >
          所属科队
        </List.Item>
        <List.Item
          extra={USER_INFO?.customsName}
          arrow='empty'
          thumb={<Icon name='swap' size='md' color={Themes.brand_primary} style={{ marginRight: 15 }} />}
        >
          关联进出境关区
        </List.Item>
        <List.Item
          extra={USER_INFO?.customsPlaceName}
          arrow='empty'
          thumb={<Icon name='block' size='md' color={Themes.brand_primary} style={{ marginRight: 15 }} />}
        >
          关联监管场所
        </List.Item>
      </List>
    </View>
  )
}
