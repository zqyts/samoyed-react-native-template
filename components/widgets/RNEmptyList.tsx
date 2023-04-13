import { memo } from 'react'
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native'
import { RNNoData } from '../icons/RNNoData'

type Props = {
  isLoading: boolean
}
const RNEmptyList = memo(({ isLoading }: Props) => {
  return (
    <View style={styles.wrap}>
      {!isLoading ? (
        <View>
          <RNNoData />
          <Text style={styles.txtMsg}>暂无数据</Text>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  wrap: {
    minHeight: 400,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtMsg: {
    paddingVertical: 4,
    textAlign: 'center'
  }
})

export default RNEmptyList
