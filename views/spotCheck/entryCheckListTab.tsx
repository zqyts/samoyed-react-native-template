import { SpotCheckListItem } from '@/components/business'
import { RNResult } from '@/components/widgets'
import { fetchPreEntryListByKeywordPage } from '@/services/spotCheck'
import {Card, ListView, WhiteSpace} from '@ant-design/react-native'
import React, {forwardRef, useEffect, useImperativeHandle, useRef} from 'react'
import {StyleSheet, View} from 'react-native'
import CommonStyle from "@/constants/CommonStyle";
import {useNavigation} from "@react-navigation/native";
interface IProps {
  status: string
  goDetail(id: string): void
  cancelClick?(id: string): void
  getKeyWordCallBack(): string,
  editClick?(id: string): void,
  filterValue: {
    tradeName?: string,
    principalName?: string,
  },
}
export type refGoodsInfoListTabProps = {
  refresh(stu: string): void
}
const EntryCheckListTab = forwardRef<refGoodsInfoListTabProps, IProps>((props, ref) => {
  const { goDetail, cancelClick, status, filterValue, getKeyWordCallBack,editClick, } = props
  const tabRef = useRef<ListView<any> | null>(null)
  const onFetch = async (pageNo = 1, startFetch: (data: any[], pageSize: number) => void, abortFetch: () => void) => {
    try {
      console.log('filterValue....',filterValue)
      let pageSize = 10
      const keyWord = getKeyWordCallBack()
      const res = await fetchPreEntryListByKeywordPage({
        transportName: keyWord,
        ieFlag: status,
        needCheck: '2',
        tradeName: filterValue.tradeName,
        principalName: filterValue.principalName,
        checkStatus: '1',
        pageNo,
        pageSize
      })
      startFetch(res.data.records, pageSize)
    } catch (err) {
      abortFetch() // manually stop the refresh or pagination if it encounters network error
    }
  }
  // 子组件的值转发给父组件
  const typePage='2'
  useImperativeHandle(
    ref,
    () => ({
      refresh: (stu: string) => {
        tabRef.current?.refresh()
      }
    }),
    [tabRef, status]
  )
  const navigation = useNavigation();
  //监听当前页面,在页面获得焦点时执行刷新操作
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      tabRef.current?.refresh()
    })
    return unsubscribe
  }, [onFetch]);
  return (
    <View style={CommonStyle.containerList}>
      <View style={styles.container}>
        <ListView
          onFetch={onFetch}
          ref={(ref) => (tabRef.current = ref)}
          keyExtractor={(item) => item.id}
          emptyView={() => <RNResult message='暂无数据'></RNResult>}
          renderItem={(item, index) =>
              <Card style={CommonStyle.cardStyle}>
                <SpotCheckListItem detailClick={goDetail} item={item} cancelClick={cancelClick} typePage={typePage} editClick={editClick}></SpotCheckListItem>
              </Card>
          }
          numColumns={1}
        />
        <WhiteSpace size='lg' style={{ paddingTop: 40 }} />
      </View>
    </View>
  )
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
})
export default EntryCheckListTab
