import Layout from '@/constants/Layout'
import { StyleSheet, Image, Pressable, View, Text } from 'react-native'
interface IPostItem {
  userId: number
  id: number
  title: string
  body: string
}
type ISpotCheckItem = IPostItem & { onPress?: () => void }

const FlashListDemo = ({ title, body, onPress = () => {} }: ISpotCheckItem) => {
  return (
    <Pressable style={styles.wrap} onPress={onPress}>
      <Image
        style={styles.img}
        resizeMode='cover'
        source={{
          uri: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
        }}
      />
      <View>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={3}>{body}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrap: {
    margin: 2,
    overflow: 'hidden',
    padding: 2
  },
  img: {
    height: 56,
    width: Layout.screenWidth
  },
  title: {
    fontWeight: 'bold'
  }
})

export default FlashListDemo
