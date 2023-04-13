import {RNField, RNListTitle, RNPicker, RNTextarea} from '@/components/widgets'
import Themes from '@/constants/Themes'
import useDataSource from '@/hooks/useDataSource'
import {fetchEntryCheckConfirm, fetchPreEntryDetailById, getCountryList} from '@/services/spotCheck'
import {
  Button,
  Card,
  Icon,
  List,
  Modal,
  Radio,
  TextareaItem,
  Toast,
  WhiteSpace,
  WingBlank
} from '@ant-design/react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ScrollView, Text, View, StyleSheet, Pressable } from 'react-native'
import { RouteComponentProps } from 'types'
import * as z from 'zod'
import {RadioValue} from "@ant-design/react-native/lib/radio/PropsType";
import React, {useState} from "react";
import CommonStyle from "@/constants/CommonStyle";
import {useStore} from "@/models/store";
import useDict from "@/hooks/useDict";

interface EventRadioGroup {
  target: { value: RadioValue }
}

interface OpinionDict {
  label: string
  value: string
}
export default function EntryCheckResult({ navigation,route }: RouteComponentProps) {
  const USER_INFO = useStore((state) => state.USER_INFO)
  const opinionDict = useDict<OpinionDict[]>('opinion_tpl')
  const checkResultDetail = useDataSource<any>(() => fetchPreEntryDetailById({id: route.params.id})) || {}
  const checkResultData = [{label: '核验无问题，放行', value: '1'},{label: '查获', value: '2'},{label: '结果待定', value: '3'}, ]
  const schema = z.object({
    hyjg: z.array(z.string()).length(1, { message: '请选择核验结果' }),
    clyj: z.string().max(300, { message: '处理意见不能超过300字' })
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue
  } = useForm({
    defaultValues: {
      hyjg: [],
      clyj: ''
    },
    resolver: zodResolver(schema)
  })
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false)

  const onChangePick = (event: any, name: any) => {
    console.log(event,name,'1111')
    if (name === 'clyj') {
      setValue(name, getValues(name) + event[0])
      return
    }
    setValue(name, event[0])
  }
  const [checkResult, setCheckResult] = useState<any>(null)
  const [required,setRequired] = useState<any>(true)
  const onGroupChange2 = (e: EventRadioGroup) => {
    setCheckResult(e.target.value)
    setRequired(e.target.value === '1'?false:true)
    console.log(checkResult,'checkResult',e.target.value,checkResultData)
  }
  const onSubmit = (data: any) => {
    console.log(checkResult,'checkResult')
    const vaild = onSubmitResult()
    if (!vaild) {
      return
    }
    Modal.alert('提示', '已录入核验结果和处理意见，请确定是否提交？', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
      { text: '确定', onPress: onFetchSubmit }
    ])
  }
  const goDetailPage = () => {
    navigation.push('GoodsGoodsInfoDetail', { id: route.params.id })
  }
  const onSubmitResult = () => {
    const value=getValues().clyj.substring(0,300)
    setValue('clyj',value)
    if (!checkResult) {
      Toast.fail('请选择核验结果')
      return false
    }
    if (checkResult !== '1') {
      const vaildDealOpinion = getValues().clyj.replace(/\s*/g, '')
      if (!vaildDealOpinion) {
        Toast.fail('请输入处理意见')
        return false
      }
      if (getValues().clyj.length > 300) {
        Toast.fail('处理意见不能超过300字')
        return false
      }
    }
    return true;
  }

  const onFetchSubmit = () => {
    if (isSubmiting) {
      return
    }
    setIsSubmiting(true)
    const loading = Toast.loading('正在处理，请稍等')
    fetchEntryCheckConfirm({
      id: route.params.id,
      checkResult: checkResult,
      handleOpinion: getValues().clyj
    }).then(resp => {
      Toast.remove(loading)
      Toast.success('处理已完成')
      setIsSubmiting(false)
      setTimeout(() => {
        navigation.goBack()
      }, 1500)
    }).finally(() => {
      Toast.remove(loading)
      setIsSubmiting(false)
    })
  }
  const onOpinion = (item:any,value: any)=> {
    setValue('clyj', getValues('clyj') + value)
  }
  const clearText = () =>{
    setValue('clyj','')
  }
  return (
    <ScrollView style={{marginTop: 10}}>
      <Card style={styles.cardStyle}>
        <RNField key={Math.random()} label='接受申报科队：' value={USER_INFO?.immiName} />
        <RNField key={Math.random()} label='审核人：' value={USER_INFO?.nickname} />
      </Card>
      <View style={styles.infoHeader}>
        {/*<Text style={styles.infoHeaderText}>基础信息</Text>*/}
        <RNListTitle title='基础信息：'></RNListTitle>
        <Pressable onPress={goDetailPage}>
          <Text style={styles.infoHeaderMore}>点击查看更多</Text>
        </Pressable>
      </View>
      <Card style={styles.cardStyle}>
        <RNField key={Math.random()} label='车牌号：' value={checkResultDetail.transportName} />
        <RNField key={Math.random()} label='企业名称：' value={checkResultDetail.tradeName} />
        <RNField key={Math.random()} label='负责人：' value={checkResultDetail.principalName} />
        <RNField key={Math.random()} label='申报时间：' value={checkResultDetail.declareTime} />
        <RNField key={Math.random()} label='申报单状态：' value={checkResultDetail.declareStatus} />
        <RNField key={Math.random()} label='报关回执：' value={checkResultDetail.customsReceipt} />
      </Card>
      <RNListTitle title='选择核验结果' required={true}></RNListTitle>
      <Card style={styles.cardStyle}>
        <Radio.Group
            onChange={onGroupChange2}
            value={checkResult}>
          {
            checkResultData.map((item, idx) => (
              <Radio value={item.value} key={item.value} style={CommonStyle.padding}>{item.label}</Radio>
            ))
          }
        </Radio.Group>
      </Card>

      <RNListTitle title='录入处理意见' required={required}></RNListTitle>
      <Card style={styles.cardStyle}>
        <RNTextarea name='clyj' control={control} placeholder='添加处理意见（300字以内）' count={300}/>
        <Icon name='close-circle' size='sm' onPress={clearText} color='#eee' style={styles.iconClear}/>

        <WhiteSpace size='xs' style={{ marginTop: 10 }} />

        <View style={CommonStyle.flexWrap}>
          { opinionDict.map((item, idx) => (
              <Button
                  size="small"
                  key={item.value}
                  onPress={() => onOpinion(item,item.value)}
                  style={styles.btnOpinion}>{item.label}</Button>))
          }
        </View>
      </Card>
      <WhiteSpace size='lg' style={{ marginTop: 20 }} />
      <WingBlank>
        <Button onPress={onSubmit} type='primary' style={CommonStyle.bottomOneHalfBtn}>
          提交
        </Button>
      </WingBlank>
      <WhiteSpace size='lg' style={{ marginTop: 20 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoHeaderText: {
    color: 'rgba(0,0,0,0.45)',
    fontSize: 14
  },
  infoHeaderMore: {
    color: Themes.brand_primary,
    textDecorationLine: 'underline',
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 15
  },
  cardStyle:{
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
  },
  btnOpinion:{
    minWidth: 60,
    minHeight: 30,
    marginRight: 8,
    marginTop:8
  },
  iconClear:{
    position:'absolute',
    right: 80,
    bottom: 64,
  }
})
