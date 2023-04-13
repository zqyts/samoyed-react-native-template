import GoodsEditItem from '@/components/business/GoodsEditItem'
import { RNField, RNListTitle, RNMoreInfo } from '@/components/widgets'
import useDataSource from '@/hooks/useDataSource'
import { getCountryList } from '@/services/spotCheck'
import {Card, List, Modal, WhiteSpace} from '@ant-design/react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {ScrollView, StyleSheet, View} from 'react-native'
import * as z from 'zod'
import CommonStyle from "@/constants/CommonStyle";

export default function EntryCheckResult() {
  const checkResultData = useDataSource<any[]>(getCountryList) || []
  const [goodsList, setGoodsList] = useState([{ id: '1' }])
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
    //
  }
  const moreInfoClick = () => {
    setMoreInfoShow(!moreInfoShow)
  }
  const onPressGoodsItem = () => {
    //
  }
  return (
    <ScrollView>
      <RNListTitle title='运输工具详情'></RNListTitle>
      <Card style={styles.cardStyle}>
        <RNField label='车牌号：' value='' />
        <RNField label='司机姓名：' value='' />
        <RNField label='证件种类：' value='' />
        <RNField label='证件号码：' value='' />
      </Card>
      <RNListTitle title='联系人'></RNListTitle>
      <Card style={styles.cardStyle}>
        <RNField label='企业名称：' value='' />
        <RNField label='运输工具负责人：' value='' />
        <RNField label='联系电话：' value='' />
      </Card>
      <RNListTitle title='载装货物详情'></RNListTitle>
        <View style={CommonStyle.cardStyleRadius}>
          {goodsList && goodsList.length > 0
            ? goodsList.map((item, index) => {
                return <GoodsEditItem item={item} key={item.id} index={index} isDetail={true}></GoodsEditItem>
              })
            : null}
        </View>
      <RNMoreInfo onPress={moreInfoClick} isShow={moreInfoShow} />
      <RNListTitle title='载装货物详情'></RNListTitle>
      {moreInfoShow ? (
        <View style={styles.cardStyle}>
          <RNField label='申报单编号：' value='' />
          <RNField label='货物运输批次号：' value='' />
          <RNField label='出入境关区：' value='' />
          <RNField label='监管场所：' value='' />
          <RNField label='申报单状态：' value='' />
          <RNField label='报关回执：' value='' />
          <RNField label='申报时间：' value='' />
          <RNField label='删单时间：' value='' />
        </View>
      ) : (
        <></>
      )}
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
  },
})
