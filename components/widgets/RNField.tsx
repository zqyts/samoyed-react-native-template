import { ReactNode } from 'react'
import { View, Text, StyleSheet, PixelRatio } from 'react-native'
interface IRNFieldProps {
  label: string
  required?: boolean
  value?: string
  rightComponent?: ReactNode
}
export default function RNField(props: IRNFieldProps) {
  const { label, ...rest } = props
  return (
    <View style={styles.container}>
      <View style={styles.labelWrap}>
        {rest.required ? <Text style={styles.required}>*</Text> : null}
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.rightWrap}>
        {rest.value ? <Text style={styles.input}>{rest.value}</Text> : <Text style={styles.input}>-</Text>}
        {rest.rightComponent ? <View style={styles.rightComponent}>{rest.rightComponent}</View> : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: 'rgba(0,0,0,0.15)',
    marginLeft: 6,
    paddingVertical: 6
  },
  labelWrap: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 15,
    color: 'rgba(73,73,73,0.85)'
  },
  required: {
    color: 'rgb(255, 85, 0)',
    fontSize: 14
  },
  rightWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 15,
    flexWrap: 'wrap',
    flex: 1
  },
  input: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.85)',
    textAlign: 'right'
  },
  rightComponent: {
    paddingLeft: 15,
    color: 'rgba(0,0,0,0.85)',
  }
})
