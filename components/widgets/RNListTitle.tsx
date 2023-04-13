import { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
interface ITitleProps {
  title: string,
  required?:boolean
}
const RNListTitle: React.FC<ITitleProps> = memo(({ title,required }: ITitleProps) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>
        {required ? <Text style={{ color: 'rgb(255, 85, 0)' }}>*</Text> : null}{title}
      </Text>
    </View>
  )
})

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 15,
  },
  title: {
    color: 'rgb(68,68,68)',
    fontSize: 15,
    fontWeight: '500'
  }
})

export default RNListTitle
