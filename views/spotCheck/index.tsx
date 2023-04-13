import {fetchPreEntryCancelCheck, fetchPreEntryListByKeywordPage} from '@/services/spotCheck'
import {
    Button,
    Drawer,
    Icon,
    InputItem,
    List,
    ListView,
    Modal,
    SearchBar,
    Tabs, Toast,
    View,
    WhiteSpace,
    WingBlank
} from '@ant-design/react-native'
import React, {useRef, useState} from 'react'
import {Pressable, Text, StyleSheet, ScrollView, Keyboard} from 'react-native'
import {RouteComponentProps} from 'types'
import EntryCheckListTab, {refGoodsInfoListTabProps} from './entryCheckListTab'
import CommonStyle from "@/constants/CommonStyle";
import {RNVehicle, RNVehicleInput} from "@/components/widgets";

export default function GoodsIndex({navigation}: RouteComponentProps) {
  const refGoodsInfoListTab = useRef<refGoodsInfoListTabProps>(null)
  const refGoodsInfoSecondTab = useRef<refGoodsInfoListTabProps>(null)
  const [keyWord, setKeyWord] = useState('')
  const cacheRef = useRef('1')
  const [filterValue, setFilterValue] = useState({
    tradeName: '',
    principalName: ''
  })
  const drawerRef = useRef<{ openDrawer: Function; closeDrawer: Function } | null>(null)
  const [isSubmiting,setIsSubmiting] = useState<boolean>(false)
  const [onShowRNVehicleKeyBord, setOnShowRNVehicleKeyBord] = useState<boolean>(false)

  const goDetail = (id: string) => {
    navigation.push('GoodsGoodsInfoDetail', {id})
    setOnShowRNVehicleKeyBord(false)
  }
  const cancelClick = (id:string) => {
    setOnShowRNVehicleKeyBord(false)
    Modal.alert('提示', '确定要取消该条申报记录的核验工作？', [
      {text: '取消', onPress: () =>console.log(cacheRef.current,'11111111'), style: 'cancel'},
      {text: '确定', onPress: () => onFetchCancelCheck(id)}
    ])
  }
  const editClick = (id: string) => {
    setOnShowRNVehicleKeyBord(false)
    navigation.push('SpotCheckEntryCheckResult', {id})
  }
  const onSearchSubmit = () => {
    if (cacheRef.current === '1') {
      refGoodsInfoListTab.current?.refresh('1')
    } else {
      refGoodsInfoSecondTab.current?.refresh('2')
    }
  }
  const onSearchCancel = () => {
    onKeyboard()
    setKeyWord('')
    onSearchSubmit()
    setOnShowRNVehicleKeyBord(false)
  }
  const onSearchChange = (val: string) => {
    setKeyWord(val)
  }
  const onOpenChange = (isOpen: any) => {
    console.log('是否打开了 Drawer', isOpen.toString())
  }
  const openDrawer = () => {
    onKeyboard()
    setOnShowRNVehicleKeyBord(false)
    drawerRef.current?.openDrawer()
  }
  const onFilterSubmit = () => {
    onKeyboard()
    setTimeout(() => {
      drawerRef.current?.closeDrawer() // 500ms 后更新打开状态
    }, 500);
    onSearchSubmit()
    setOnShowRNVehicleKeyBord(false)
  }
  const onFilterReset = () => {
    onKeyboard()
    setTimeout(() => {
      drawerRef.current?.closeDrawer() // 500ms 后更新打开状态
    }, 500);
    setFilterValue({
      tradeName: '',
      principalName: ''
    })
    onSearchSubmit()
  }
  const onTabChange = (tabData: any, index: number) => {
    setKeyWord('')
    setFilterValue({
      tradeName: '',
      principalName: ''
    })
    const arr = ['1', '2']
    cacheRef.current = arr[index]
    if (cacheRef.current === '1') {
      refGoodsInfoListTab.current?.refresh('1')
    } else {
      refGoodsInfoSecondTab.current?.refresh('2')
    }
    onKeyboard()
    setOnShowRNVehicleKeyBord(false)
  }
  const getKeyWordCallBack = () => {
    return keyWord
  }

  /**
   * 取消待核验
   */
  const onFetchCancelCheck = (id: string) => {
    if (isSubmiting){
      return
    }
    setIsSubmiting(true)
    const loading = Toast.loading('正在处理，请稍等')
    fetchPreEntryCancelCheck({
      ids: [id]
    }).then(resp => {
      Toast.remove(loading)
      setIsSubmiting(false)
      if (cacheRef.current == '1'){
        refGoodsInfoListTab.current?.refresh(cacheRef.current)
      }else {
        refGoodsInfoSecondTab.current?.refresh(cacheRef.current)
      }
    }).finally(()=>{
      Toast.remove(loading)
      setIsSubmiting(false)
    })
  }
  //关闭软键盘
  const onKeyboard= () => {
    Keyboard.dismiss()
  }
  const onKeyboardChange = (vehicle: string) => {
    onSearchChange(vehicle)
  }
  const onShowChange = (onShow: boolean) => {
    setOnShowRNVehicleKeyBord(onShow)
    onSearchSubmit()
  }
  const onCancelKeyBord = (onShow: boolean) => {
    setOnShowRNVehicleKeyBord(onShow)
    onSearchCancel()
  }
  return (
    <Drawer
      sidebar={
        <View style={styles.sidebarWrap}>
          <Text style={styles.sidebarTitle}>其他查询条件</Text>
          <Text style={styles.filterLabel}>企业名称</Text>
          <InputItem
            clear
            value={filterValue.tradeName}
            onChange={(val: string) => {
              setFilterValue({
                ...filterValue,
                tradeName: val
              })
            }}
            placeholder='输入企业名称'
          />
          <WhiteSpace size='lg'/>
          <WhiteSpace size='lg'/>
          <Text style={styles.filterLabel}>运输工具负责人名称</Text>
          <InputItem
            clear
            value={filterValue.principalName}
            onChange={(val: string) => {
              setFilterValue({
                ...filterValue,
                principalName: val
              })
            }}
            placeholder='输入运输工具负责人名称'
          />
          <View style={styles.filterBtnWrap}>
            <WingBlank>
              <Button onPress={onFilterReset}>重置</Button>
              <WhiteSpace size='lg'/>
              <Button onPress={onFilterSubmit} type='primary'>
                确认
              </Button>
            </WingBlank>
          </View>
        </View>
      }
      position='right'
      open={false}
      drawerRef={(el: any) => (drawerRef.current = el)}
      onOpenChange={onOpenChange}
      drawerBackgroundColor='#FFFFFF'
    >
      <View style={{flex: 1}}>
        <View style={styles.searchWrap}>
          <View style={styles.searchBar}>
            <RNVehicleInput key={Math.random()} value={keyWord}
                            onPress={() => setOnShowRNVehicleKeyBord(true)}
                            onBlur={() => setOnShowRNVehicleKeyBord(false)}
                            onCancel={onSearchCancel}
                            placeholder='搜索车牌号'/>
            {/*<SearchBar
              value={keyWord}
              placeholder='搜索车牌号'
              onFocus={value => {
                setOnShowRNVehicleKeyBord(true)
                onKeyboard()
              }}
              onSubmit={onSearchSubmit}
              onCancel={onSearchCancel}
              onChange={onSearchChange}
              returnKeyType='search'
              style={CommonStyle.inputHeight}
            />*/}
          </View>
          <Pressable style={styles.filterWrap} onPress={openDrawer}>
            <Icon name='funnel-plot' size={18} color={'rgba(0,0,0,0.50)'}></Icon>
            <Text style={styles.filterText}>其他条件</Text>
          </Pressable>
        </View>
        <Tabs
            tabs={[{title: '进境车辆'}, {title: '出境车辆'}]}
            onChange={onTabChange}
            onTabClick={onTabChange}
            tabBarUnderlineStyle={CommonStyle.tabBarline}
            tabBarActiveTextColor={'rgb(0,0,0)'}
            tabBarInactiveTextColor={'rgb(146,146,146)'}
            tabBarTextStyle={CommonStyle.tabBarStyle}
        >
          <EntryCheckListTab
            status='1'
            goDetail={goDetail}
            ref={refGoodsInfoListTab}
            cancelClick={cancelClick}
            editClick={editClick}
            getKeyWordCallBack={getKeyWordCallBack}
            filterValue={filterValue}
          />
          <EntryCheckListTab
            status='2'
            goDetail={goDetail}
            ref={refGoodsInfoSecondTab}
            cancelClick={cancelClick}
            editClick={editClick}
            getKeyWordCallBack={getKeyWordCallBack}
            filterValue={filterValue}
          />
        </Tabs>
      </View>
      <RNVehicle value={keyWord} maxLength={8} showKeyBord={onShowRNVehicleKeyBord} onChange={onKeyboardChange}
                 onShowChange={onShowChange} onCancel={onCancelKeyBord}/>
    </Drawer>
  )
}

const styles = StyleSheet.create({
  sidebarContainer: {
    flex: 1
  },
  searchWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 15
  },
  searchBar: {
    flex: 1
  },
  filterWrap: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  filterText: {
    color: 'rgba(0,0,0,0.65)',
    fontSize: 14
  },
  sidebarWrap: {
    flex: 1,
    paddingVertical: 15
  },
  filterBtnWrap: {
    width: 300,
    position: 'absolute',
    bottom: 10,
    left: 0
  },
  filterLabel: {
    fontSize: 17,
    paddingHorizontal: 15
  },
  sidebarTitle: {
    paddingHorizontal: 15,
    paddingBottom: 30,
    fontSize: 14
  }
})
