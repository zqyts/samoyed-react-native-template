import RNKeyBord from "./RNKeyBord";
import React, {useCallback, useEffect, useState} from "react";
import {TouchableOpacity, View, Text, StyleSheet} from "react-native";
import {autoHeight, autoWidth, scaleSize} from "@/components/widgets/RNVehicleKeyBoard/utils/ScreenUtil";
import DeviceInfo from "@/components/widgets/RNVehicleKeyBoard/utils/DeviceInfo";

interface IRNPropsInterface {
  onChange: (vehicle: string) => void
  onShowChange?: (showKeyBord: boolean) => void
  showKeyBord: boolean
  maxLength?: number
  onCancel?: (showKeyBord: boolean) => void
  value: string
}


const vehicleTitles = [
  '京', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '沪', '苏',
  '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '桂',
  '琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁',
  '新', '台', '港', '澳', '']
const vehicleNum = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
  'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
  'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '',
  'Z', 'X', 'C', 'V', 'B', 'N', 'M', '', ''
]

const RNVehicle = (props: IRNPropsInterface) => {
  let {onChange, showKeyBord = false, maxLength = 8, onShowChange, onCancel, value = ''} = props

  // 输入框位置
  const [inputIndex, setInputIndex] = useState<number>(0);
  const [vehicleProvince, setVehicleProvince] = useState<string[]>(vehicleTitles);

  const onSelected = (index: any) => {
    let ki: number = inputIndex
    const vehicle = value + vehicleProvince[index]
    if (vehicle.length > maxLength) {
      return
    }
    if (index === vehicleProvince.length - 1) {
      ki -= 1
      setInputIndex(ki)
    } else {
      ki += 1
      if (inputIndex !== vehicle.length - 1) {
        setInputIndex(ki)
      }
    }
    if (ki > 0) {
      setVehicleProvince(vehicleNum)
    } else {
      setVehicleProvince(vehicleTitles)
    }
    onChange(vehicle)
  }

  const onDeleted = () => {
    if (value.length) {
      value = value.substring(0, value.length - 1)
      const ki = inputIndex - 1
      setInputIndex(ki)
      onChange(value)
      if (ki === 0) {
        setVehicleProvince(vehicleTitles)
      }
    } else {
      onClear()
    }
  }
  const onClear = () => {
    value = ''
    setVehicleProvince(vehicleTitles)
    setInputIndex(0)
  }

  useEffect(() => {
    if (value === '') {
      setVehicleProvince(vehicleTitles)
      setInputIndex(0)
    }
  }, [value])

  const _renderKeyBord = () => {
    if (!showKeyBord) {
      return;
    }
    return (
      <View>
        <View style={styles.option}>
          <TouchableOpacity
            onPress={() => {
              onClear()
              onCancel && onCancel(false)
            }} style={{flex: 1}}>
            <Text style={styles.keyFinishLeft}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onShowChange && onShowChange(false)
            }} style={{flex: 1}}>
            <Text style={styles.keyFinishRight}>完成</Text>
          </TouchableOpacity>
        </View>
        <RNKeyBord titles={vehicleProvince}
                   onSelected={onSelected}
                   onDeleted={onDeleted}
        />
      </View>
    )
  }
  return (
    <View style={styles.keyBord}>
      {_renderKeyBord()}
    </View>
  )
}

export const styles = StyleSheet.create({
  keyFinishLeft: {
    fontSize: scaleSize(30),
    textAlignVertical: 'center',
    textAlign: 'left',
    height: autoHeight(70),
    // width: DeviceInfo.deviceWidth,
    paddingLeft: autoWidth(30),
    paddingRight: autoWidth(18),
    backgroundColor: '#FFF',
    flex: 1
  },
  keyFinishRight: {
    fontSize: scaleSize(30),
    textAlignVertical: 'center',
    textAlign: 'right',
    height: autoHeight(70),
    paddingLeft: autoWidth(18),
    paddingRight: autoWidth(30),
    backgroundColor: '#FFF',
    flex: 1
  },
  keyBord: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 199
  },
  option: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  }
});


export default React.memo(RNVehicle)
