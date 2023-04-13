import GoodsEditItem from '@/components/business/GoodsEditItem'
import { RNField, RNListTitle, RNMoreInfo } from '@/components/widgets'
import useDataSource from '@/hooks/useDataSource'
import {fetchPreEntryDetailById} from '@/services/spotCheck'
import {Card, Modal, WhiteSpace } from '@ant-design/react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState} from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, View} from 'react-native'
import * as z from 'zod'
import {RouteComponentProps} from "../../types";
import CommonStyle from "@/constants/CommonStyle";

export default function EntryCheckResult({ navigation,route }: RouteComponentProps) {
  const checkResultData = useDataSource<any>(() => fetchPreEntryDetailById({id: route.params.id})) || {}
  const [moreInfoShow, setMoreInfoShow] = useState(false)
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
  const onSubmit = (data: any) => {
    Modal.alert('提示', '已录入核验结果和处理意见，请确定是否提交？', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
      { text: '确定', onPress: () => console.log('ok') }
    ])
  }
  const goDetailPage = () => {

  }
  const moreInfoClick = () => {
    setMoreInfoShow(!moreInfoShow)
  }
  const onPressGoodsItem = () => {
    //
  }

  const onShowGoodsItem = () => {
    if (!checkResultData.goodsList || checkResultData.goodsList.length === 0) {
      return null
    }
    if (checkResultData.goodsList.length < 2) {
      return checkResultData.goodsList?.map((item: any, index: number) => {
        return <GoodsEditItem item={item} key={item.id} index={index} isDetail={true}></GoodsEditItem>
      })
    }
    if (moreInfoShow) {
      return checkResultData.goodsList?.map((item: any, index: number) => {
        return index < 2 ? (
          <GoodsEditItem item={item} key={item.id} index={index} isDetail={true}></GoodsEditItem>) : (<></>)
      })
    }
    return checkResultData.goodsList?.map((item: any, index: number) => {
      return <GoodsEditItem item={item} key={item.id} index={index} isDetail={true}></GoodsEditItem>
    })
  }
  const title = () => {
    let goodListLength = checkResultData.goodsList?checkResultData.goodsList.length:0
    return '载装货物详情'+ '('+goodListLength+')'
  }

  return (
    <ScrollView>
      <RNListTitle title='运输工具详情'></RNListTitle>

      <Card style={styles.cardStyle}>
        <RNField label='车牌号：' value={checkResultData.transportName} key={Math.random()} />
        <RNField label='司机姓名：' value={checkResultData.driverName} key={Math.random()}/>
        <RNField label='证件种类：' value={checkResultData.docType} key={Math.random()}/>
        <RNField label='证件号码：' value={checkResultData.driverId} key={Math.random()}/>
      </Card>
      <RNListTitle title='联系人'></RNListTitle>

      <Card style={styles.cardStyle}>
        <RNField label='企业名称：' value={checkResultData.tradeName} key={Math.random()}/>
        <RNField label='运输工具负责人：' value={checkResultData.principalName} key={Math.random()}/>
        <RNField label='联系电话：' value={checkResultData.principalPhone} key={Math.random()}/>
      </Card>
      <RNListTitle title={title()}></RNListTitle>
      <View style={CommonStyle.cardStyleRadius}>
        {checkResultData.goodsList && checkResultData.goodsList.length > 0
            ?
            checkResultData.goodsList.length < 2 || moreInfoShow ? (
                checkResultData.goodsList?.map((item: any, index: number) => {
                  return <GoodsEditItem item={item} key={item.id} index={index} isDetail={true}></GoodsEditItem>
                })
            ) : (
                checkResultData.goodsList?.map((item: any, index: number) => {
                  return index < 2 ? (
                      <GoodsEditItem item={item} key={item.id} index={index} isDetail={true}></GoodsEditItem>) : (<></>)
                })
            )
            : null}
        {
          checkResultData.goodsList && checkResultData.goodsList.length > 2 ? (<RNMoreInfo onPress={moreInfoClick} isShow={moreInfoShow} />) : (<></>)
        }
      </View>

      <RNListTitle title='申报单详情'></RNListTitle>

      <View style={styles.cardStyle}>
        <RNField label='申报单编号：' value={checkResultData.seqNo} key={Math.random()}/>
        <RNField label='货物运输批次号：' value={checkResultData.manifestId} key={Math.random()}/>
        <RNField label='出入境关区：' value={checkResultData.customsCode} key={Math.random()}/>
        <RNField label='监管场所：' value={checkResultData.customsPlace} key={Math.random()}/>
        <RNField label='申报单状态：' value={checkResultData.declareStatus} key={Math.random()}/>
        <RNField label='报关回执：' value={checkResultData.customsReceipt} key={Math.random()}/>
        <RNField label='申报时间：' value={checkResultData.declareTime} key={Math.random()}/>
        <RNField label='删单时间：' value={checkResultData.deletedTime} key={Math.random()} />
      </View>

      <WhiteSpace size='lg' style={{ marginTop: 20 }} />
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  cardStyle:{
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    padding: 6,
    borderRadius: 8,
    borderColor: '#fff'
  }
})
