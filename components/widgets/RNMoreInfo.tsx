import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
interface IProps {
  onPress(): void
  isShow: boolean
}
export default function RNMoreInfo({ onPress, isShow }: IProps) {
  return (
    <Pressable onPress={onPress} style={styles.wrap}>
      <Text style={styles.headerTitle}>{isShow ? '收起' : '查看更多'}</Text>
      {isShow ? <AntDesign name='up' size={14} color='#26B3A3' /> : <AntDesign name='down' size={14} color='#26B3A3' />}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    alignItems: 'center'
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#26B3A3'
  }
})
