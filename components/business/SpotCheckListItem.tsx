import Themes from '@/constants/Themes'
import {Button, Card, Checkbox, Icon, WingBlank} from '@ant-design/react-native'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { RNDivider } from '../widgets'
import CommonStyle from "@/constants/CommonStyle";
import React, {useRef} from "react";
interface IPreEntryItemProps {
  detailClick(id: string): void
  editClick?(id: string): void
  cancelClick?(id: string): void
  item: any,
  status?:string,
  typePage?:string,
}
export default function SpotCheckListItem({ detailClick, editClick, cancelClick, item,status,typePage }: IPreEntryItemProps) {
  return (
    <View style={styles.wrap}>
        <View style={styles.arrowWrap}>
          <Pressable style={styles.contentWrap} onPress={() => detailClick(item.id)}>
            <View style={styles.arrowWrapFlex}>
              <View>
              {status?<Text style={CommonStyle.listHeaderTitle}>
                车牌号：<Text style={styles.value}>{item.transportName || '--'}</Text>
              </Text>:<Text style={CommonStyle.listHeaderTitle}>
                车牌号：<Text style={styles.value}>{item.transportName || '--'}</Text>
              </Text>}
              </View>
            </View>
            <View style={styles.arrowWrap}>
              <Text style={styles.label}>
                申报单编号：<Text style={styles.value}>{item.seqNo || '--'}</Text>
              </Text>
            </View>
            <View style={styles.arrowWrap}>
              <Text style={styles.label}>
                企业名称：<Text style={styles.value}>{item.tradeName || '--'}</Text>
              </Text>
            </View>
            <View style={styles.inlineWrap}>
              <Text style={styles.label}>
                负责人：<Text style={styles.value}>{item.principalName || '--'}</Text>
              </Text>
            </View>
            <View style={styles.arrowWrap}>
              <Text style={styles.label}>
                申报时间：<Text style={styles.value}>{item.declareTime || '--'}</Text>
              </Text>
            </View>
            <View style={styles.inlineWrap}>
              <Text style={styles.label}>
                申报单状态：<Text style={styles.value}>{item.declareStatusName || '--'}</Text>
              </Text>
            </View>
            <View style={styles.inlineWrap}>
              <Text style={styles.label}>
                报关回执：<Text style={styles.value}>{item.customsReceipt || '--'}</Text>
              </Text>
            </View>
          </Pressable>
        </View>
      {typePage === '2'?<RNDivider/>:''}
      {typePage === '2'&&item.declareStatus == 1?<View style={styles.actionWrap}>
        <Pressable onPress={() => cancelClick && cancelClick(item.id)} style={styles.btnWrap}>
          <Text style={styles.btnText}>取消核验</Text>
        </Pressable>
        <RNDivider position='right'/>
        <Pressable onPress={() => editClick && editClick(item.id)} style={styles.btnWrap}>
          <Text style={styles.btnText}>录入结果</Text>
        </Pressable>
      </View>:''}

    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    // backgroundColor: '#FFFFFF',
    // marginBottom: 6
    flex: 1,
  },
  content: {
    paddingLeft: 15
  },
  arrowWrap: {

  },
  arrowWrapFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  contentWrap: {
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingTop: 15
  },
  label: {
    color: 'rgba(0,0,0,0.45)',
    fontSize: 14,
    paddingBottom: 6
  },
  value: {
    color: 'rgba(0,0,0,0.65)'
  },
  actionWrap: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  btnText: {
    color: Themes.brand_primary,
    fontSize: 15,
    textAlign: 'center'
  },
  inlineWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnWrap: {
    flex: 1
  },
  checkStyle: {
    width: 20,
    height: 20,
    marginLeft: 10
  },
  bottomCheck:{
    position: 'absolute',
    height: 50,
    bottom: 10,
  }
})
