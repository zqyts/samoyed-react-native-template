import { useEffect, useRef, useState } from 'react'
import { RouteComponentProps } from '../../types'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { queryUserRemoveStatus, fetchLogoutCancel, fetchLogoutConfirm, fetchLogoutSubmit } from '@/services/user'
import { Button, Checkbox, Modal, TextareaItem, Toast } from '@ant-design/react-native'
import { useStore } from '@/models/store'
import { IDictOptions } from '@/services/dict'
import Themes from '@/constants/Themes'
import CommonStyle from '@/constants/CommonStyle'
export default function AccountLogoff({ navigation }: RouteComponentProps) {
  const fetchLogin = useStore((state) => state.fetchLoginOut)
  const [logoutStatus, setLogoutStatus] = useState('')
  const [checkDataList, setCheckDataList] = useState<IDictOptions[]>([])
  const cacheRef = useRef(0)
  const cacheSuggestionVal = useRef('')
  const logoutSubmit = () => {
    const idx = checkDataList.findIndex((item) => item.flag === true)
    if (idx > -1) {
      cacheRef.current = 0
      Modal.alert('提示', '是否确认提交？提交后，将进入两周时间的注销冷静期', [
        { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
        { text: '确认', onPress: () => confirm() }
      ])
    } else {
      Toast.info('请反馈注销原因哦')
    }
  }
  const logoutConfirm = () => {
    cacheRef.current = 1
    Modal.alert('提示', '确认注销后，您将无法正常使用e岸通应用功能，是否确定？', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
      { text: '确认', onPress: () => confirm() }
    ])
  }
  const logoutCancel = async () => {
    await fetchLogoutCancel()
    Toast.success('操作成功')
    setTimeout(() => {
      navigation.goBack()
    }, 1000)
  }
  const onCheckBoxChange = (idx: number, val: boolean) => {
    const arr = checkDataList.map((item, index) => {
      if (idx === index) {
        return {
          dictValue: item.dictValue,
          flag: val,
          dictKey: item.dictKey
        }
      } else {
        return {
          dictValue: item.dictValue,
          flag: false,
          dictKey: item.dictKey
        }
      }
    })
    setCheckDataList(arr)
  }
  const confirm = async () => {
    if (cacheRef.current === 0) {
      let str = ''
      checkDataList.forEach((item) => {
        if (item.flag) {
          str = item.dictKey
        }
      })
      await fetchLogoutSubmit({
        removeReason: str,
        userSuggestion: cacheSuggestionVal.current
      })
      Toast.success('操作成功')
      setTimeout(() => {
        navigation.goBack()
      }, 1000)
    } else {
      await fetchLogoutConfirm()
      fetchLogin(() => {
        navigation.replace('Login')
      })
    }
  }
  const getDictList = async () => {
    setCheckDataList([
      { dictValue: '没我想要的功能', flag: false, dictKey: '1' },
      { dictValue: '卡顿', flag: false, dictKey: '2' },
      { dictValue: '操作麻烦', flag: false, dictKey: '3' },
      { dictValue: '其它原因', flag: false, dictKey: '4' }
    ])
  }
  const getUserLogoutStatus = async () => {
    let res = await queryUserRemoveStatus()
    setLogoutStatus(res.data.removeFlowStatus)
  }
  useEffect(() => {
    getDictList()
    getUserLogoutStatus()
  }, [])
  return (
    <View style={styles.wrap}>
      {logoutStatus === null ? (
        <View>
          <View style={styles.selectWrap}>
            <View style={styles.labelWrap}>
              <View style={styles.labelLine}></View>
              <Text style={styles.labelTitle}>注销原因</Text>
            </View>
            <View style={styles.checkboxList}>
              {checkDataList.map((item, idx) => (
                <View style={styles.valWrap} key={idx}>
                  <Checkbox
                    onChange={(e: { target: { checked: boolean } }) => {
                      onCheckBoxChange(idx, e.target.checked)
                    }}
                  >
                    {item.dictValue}
                  </Checkbox>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={styles.selectWrap}>
            <View style={styles.labelWrap}>
              <View style={styles.labelLine}></View>
              <Text style={styles.labelTitle}>用户意见</Text>
            </View>
            <View style={styles.inputWrap}>
              <TextareaItem
                rows={4}
                placeholder='请输入您的意见'
                autoHeight
                style={{ paddingVertical: 5 }}
                onChangeText={(txt) => (cacheSuggestionVal.current = txt)}
              />
            </View>
          </View>
          <Button onPress={logoutSubmit} type='primary' style={CommonStyle.bottomOneHalfBtn}>
            提交
          </Button>
        </View>
      ) : null}
      {logoutStatus === '1' ? (
        <View>
          <View style={styles.selectWrap}>
            <Text style={styles.tipTitle}>温馨提示</Text>
            <Text style={styles.resultText}>
              注销流程申请中，您的账号将进入14天的注销冷静期。在该期间，您仍可继续正常使用该应用。如点击下方“取消注销”按钮，我们将为您撤销注销审核流程。
            </Text>
          </View>
          <Button onPress={logoutCancel} type='primary' style={CommonStyle.bottomOneHalfBtn}>
            取消注销
          </Button>
        </View>
      ) : null}
      {logoutStatus === '2' ? (
        <View>
          <View style={styles.selectWrap}>
            <Text style={styles.tipTitle}>温馨提示</Text>
            <Text style={styles.resultText}>
              点击“确定注销”按钮后，您的账号将会立即注销。如您不手动确认，账号将于3天期限内自动注销。
            </Text>
          </View>
          <View style={styles.btnWrap}>
            <Button type='warning' onPress={() => logoutConfirm()} style={CommonStyle.bottomOneHalfBtn}>
              确定注销
            </Button>
            <Button type='primary' onPress={logoutCancel} style={CommonStyle.bottomOneHalfBtn}>
              取消注销
            </Button>
          </View>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 20,
    backgroundColor: '#FFFFFF'
  },
  selectWrap: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 18
  },
  line: {
    height: 10
  },
  valWrap: {
    flexDirection: 'row',
    marginTop: 12
  },
  checkboxList: {
    marginLeft: 20
  },
  checkbox: {
    marginRight: 10
  },
  labelWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelTitle: {
    fontSize: 16,
    color: '#474747',
    fontWeight: 'bold'
  },
  labelLine: {
    width: 4,
    height: 18,
    backgroundColor: Themes.brand_primary,
    marginRight: 13
  },
  inputWrap: {
    paddingVertical: 8,
    paddingHorizontal: 20
  },
  resultText: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)'
  },
  tipTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 10
  },
  btnWrap: {
    alignItems: 'center',
    marginTop: 100
  }
})
