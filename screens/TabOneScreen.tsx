import Themes from '@/constants/Themes'
import {Image, Pressable, StyleSheet} from 'react-native'
import { Icon } from '@ant-design/react-native';

// import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const goTest = () => {
    navigation.push('TestDemo')
  }
  const goCheckPage = () => {
    navigation.push('SpotCheckIndex')
  }
  const goGoodsPage = () => {
    navigation.push('GoodsGoodsInfoIndex')
  }
  return (
    <View style={styles.container}>
      {/*<Text style={styles.title}>首页</Text>
      <Pressable onPress={goTest}>
        <Text style={{ fontSize: 20, color: Themes.brand_primary, paddingVertical: 20 }}>TestDemo</Text>
      </Pressable>*/}
        <Pressable onPress={goGoodsPage} style={styles.flex}>
            <Image source={require('@/assets/images/goods-icon.png')} style={styles.icon} />
            <Text style={styles.title}>货物信息</Text>
        </Pressable>
        <Pressable onPress={goCheckPage} style={styles.flex}>
          <Image source={require('@/assets/images/spotCheck-icon.png')} style={styles.icon} />
          <Text style={styles.title}>抽检核验</Text>
        </Pressable>
      {/* <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' /> */}
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
    width: '100%'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
     color: Themes.color_text_base,
    paddingVertical: 14
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  icon:{
    width: 36,
    height: 36
  },
  flex:{
    textAlign: 'center',
    display: "flex",
    alignItems: 'center',
    padding: 20,
    height: 100
  },
})
