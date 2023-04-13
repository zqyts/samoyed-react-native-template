import {
  Button,
  Drawer,
  Icon,
  InputItem,
  Modal,
  Tabs,
  View,
  WhiteSpace,
  WingBlank
} from '@ant-design/react-native'
import React, { useRef, useState } from 'react'
import {
  Pressable,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native'
import { RouteComponentProps } from 'types'
import GoodsInfoListTab, { refGoodsInfoListTabProps } from './GoodsInfoListTab'
import CommonStyle from '@/constants/CommonStyle'
import {RNVehicleInput,RNVehicle} from "@/components/widgets";

export default function GoodsIndex({ navigation }: RouteComponentProps) {
  const refGoodsInfoListTab = useRef<refGoodsInfoListTabProps>(null)
  const refGoodsInfoSecondTab = useRef<refGoodsInfoListTabProps>(null)
  const [keyWord, setKeyWord] = useState('')
  const cacheRef = useRef('1')
  const [filterValue, setFilterValue] = useState({
    tradeName: '',
    principalName: ''
  })
  const drawerRef = useRef<{ openDrawer: Function; closeDrawer: Function } | null>(null)
  const [onShowRNVehicleKeyBord, setOnShowRNVehicleKeyBord] = useState<boolean>(false)

  const goDetail = (id: string) => {
    setOnShowRNVehicleKeyBord(false)
    navigation.push('GoodsGoodsInfoDetail', {id})
  }
  const onSearchSubmit = () => {
    setOnShowRNVehicleKeyBord(false)
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
    setTimeout(() => {
      drawerRef.current?.closeDrawer() // 500ms 后更新打开状态
    }, 500);
    onKeyboard()
    setOnShowRNVehicleKeyBord(false)
    onSearchSubmit()
  }
  const onFilterReset = () => {
    setTimeout(() => {
      drawerRef.current?.closeDrawer() // 500ms 后更新打开状态
    }, 500);
    onKeyboard()
    setFilterValue({
      tradeName: '',
      principalName: ''
    })
    onSearchSubmit()
  }
  //切换tab,刷新
  const onTabChange = (tabData: any, index: number) => {
    setKeyWord('')
    onCancelKeyBord(false)
    setFilterValue({
      tradeName: '',
      principalName: ''
    })
    onKeyboard()
    setOnShowRNVehicleKeyBord(false)
    const arr = ['1', '2']
    cacheRef.current = arr[index]
      if (cacheRef.current === '1') {
      refGoodsInfoListTab.current?.refresh('1')
    } else {
      refGoodsInfoSecondTab.current?.refresh('2')
    }
  }
  const getKeyWordCallBack = () => {
    return keyWord
  }
  //关闭键盘
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
          <WhiteSpace size='lg' />
          <WhiteSpace size='lg' />
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
                <WhiteSpace size='lg' />
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
      <View style={{ flex: 1 }}>
        <View style={styles.searchWrap}>
          <View style={styles.searchBar}>
            <RNVehicleInput key={Math.random()} value={keyWord}
                            onPress={() => setOnShowRNVehicleKeyBord(true)}
                            onBlur={() => setOnShowRNVehicleKeyBord(false)}
                            onCancel={onSearchCancel}
                            placeholder='搜索车牌号'/>
            {/*<SearchBar
              value={keyWord}
              onFocus={value => {
                setOnShowRNVehicleKeyBord(true)
                onKeyboard()
              }}
              placeholder='搜索车牌号'
              onSubmit={onSearchSubmit}
              onCancel={onSearchCancel}
              onChange={onSearchChange}
              returnKeyType='search'
              maxLength={8}
              style={CommonStyle.inputHeight}
            />*/}
          </View>
          <Pressable style={styles.filterWrap} onPress={openDrawer}>
            <Icon name='funnel-plot' size={18} color={'rgba(0,0,0,0.50)'}></Icon>
            <Text style={styles.filterText}>其他条件</Text>
          </Pressable>
        </View>
        <View style={{flex:1}}>
          <Tabs
              tabs={[{ title: '进境车辆' }, { title: '出境车辆' }]}
              onChange={onTabChange}
              onTabClick={onTabChange}
              tabBarUnderlineStyle={CommonStyle.tabBarline}
              tabBarActiveTextColor={'rgb(0,0,0)'}
              tabBarInactiveTextColor={'rgb(146,146,146)'}
              tabBarTextStyle={CommonStyle.tabBarStyle}
              distanceToChangeTab={0.8}
              animated={false}
              swipeable={false}
          >
            <GoodsInfoListTab
              key='GoodsInfoFirstListTabKey'
              status='1'
              filterValue={filterValue}
              goDetail={goDetail}
              ref={refGoodsInfoListTab}
              getKeyWordCallBack={getKeyWordCallBack}
            />
            <GoodsInfoListTab
              key='GoodsInfoSecondListTabKey'
              status='2'
              filterValue={filterValue}
              goDetail={goDetail}
              ref={refGoodsInfoSecondTab}
              getKeyWordCallBack={getKeyWordCallBack}
            />
          </Tabs>
        </View>

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
  },
})
