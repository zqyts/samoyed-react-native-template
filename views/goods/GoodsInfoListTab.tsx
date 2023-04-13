import {SpotCheckListItem} from '@/components/business'
import {RNResult} from '@/components/widgets'
import {fetchPreEntryListByKeywordPage, fetchPreEntryToCheck} from '@/services/spotCheck'
import {Button, Card, Checkbox, ListView, Modal, Toast, WhiteSpace} from '@ant-design/react-native'
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import CommonStyle from "@/constants/CommonStyle";
import Themes from '@/constants/Themes'

const {width: screenWidth, height: screenHeight} = Dimensions.get('window')

interface IProps {
    filterValue: {
        tradeName?: string,
        principalName?: string,
    },

    goDetail(id: string): void

    cancelClick?(id: string): void

    getKeyWordCallBack(): string

    status: string
}

export type refGoodsInfoListTabProps = {
    refresh(stu: string): void
}
const GoodsInfoListTab = forwardRef<refGoodsInfoListTabProps, IProps>((props, ref) => {
    const {goDetail, status, filterValue, getKeyWordCallBack} = props
    const tabRef = useRef<ListView<any> | null>(null)
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false)
    const [checkedAll, setCheckedAll] = useState(false);
    const [checkedList, setCheckedList] = useState<any>([]);
    const [recordDataList, setRecordDataList] = useState<any>([]);
    const onFetch = async (pageNo = 1, startFetch: (data: any[], pageSize: number) => void, abortFetch: () => void) => {
        try {
            let pageSize = 10
            const keyWord = getKeyWordCallBack()
            const res = await fetchPreEntryListByKeywordPage({
                transportName: keyWord,
                ieFlag: status,
                needCheck: '1',
                checkStatus: '1',
                tradeName: filterValue.tradeName,
                principalName: filterValue.principalName,
                pageNo,
                pageSize
            })
            let dataList = [...checkedList];
            if (pageNo === 1) {
                dataList = []
            }
            const newDataList = dataList.concat(res.data.records)
            setCheckedList(newDataList.map((item: any) => {
                return {
                    ...item,
                    checked: false
                }
            }))
            setCheckedAll(false)
            startFetch(res.data.records, pageSize)
        } catch (err) {
            abortFetch() // manually stop the refresh or pagination if it encounters network error
        }
    }

    // 子组件的值转发给父组件
    useImperativeHandle(
        ref,
        () => ({
            refresh: (stu: string) => {
                tabRef.current?.refresh()
            }
        }),
        [tabRef, status]
    )
    const onSubmit = (item: {}) => {
        let checkedListItem: string | any[] = []
        if (checkedList) {
            checkedListItem = checkedList.filter((item: { checked: any }) => item.checked).map((item: { transportName: any }) => {
                return item.transportName
            })
        }
        if (!checkedListItem || checkedListItem.length <= 0) {
            Toast.info('请选择至少一条申报记录')
            return
        }
        if (checkedListItem.length > 0 && checkedListItem) {
            Modal.alert('提示', `选择将车牌号为${checkedListItem}的${checkedListItem.length}条申报记录转待核验？`, [
                {text: '取消', onPress: () => console.log('cancel'), style: 'cancel'},
                {text: '确定', onPress: onFetchCheck}
            ])
        }
        ``

    }
    const handleAllChange = (event: any) => {
        setCheckedAll(event.target.checked);
        const checkedAllList = checkedList.map((item: { declareStatus: number }) => ({
            ...item,
            checked: item.declareStatus == 1 ? event.target.checked : false
        }))
        setCheckedList(checkedAllList);
    }
    const handleItemChange = (index: number, event: { target: { checked: boolean; }; }) => {
        const newList = [...checkedList];
        newList[index].checked = event.target.checked;
        console.log('newList[index]...', newList[index])
        setCheckedList(newList);
        setCheckedAll(newList.every((item) => item.checked));
    }
    const handleCheckedList = (index: number) => {
        try {
            return checkedList[index].checked
        } catch (e) {

        }

    }

    /**
     * 转待查验
     */
    const onFetchCheck = () => {
        if (isSubmiting) {
            return
        }
        setIsSubmiting(true)
        const onDeal = Toast.loading('正在处理，请稍等')
        fetchPreEntryToCheck({
            ids: checkedList.filter((item: { checked: any }) => item.checked).map((item: { id: any }) => {
                return item.id
            })
        }).then(res => {
            setIsSubmiting(false)
            Toast.remove(onDeal)
            Toast.success('数据已转待核验成功')
            tabRef.current?.refresh()
            setCheckedList([])
        }).finally(() => {
            Toast.remove(onDeal)
            setIsSubmiting(false)
            tabRef.current?.refresh()
            setCheckedList([])
            console.log(checkedList, '提交后的数据')
        })
    }
    const renderItem = (item: any, index: number) => {
        const checked = handleCheckedList(index)
        return (
            <Card style={CommonStyle.cardStyle}>
                <Checkbox
                    key={index}
                    checked={checked}
                    disabled={item.declareStatus == 2}
                    onChange={(event: any) => handleItemChange(index, event)}
                    style={styles.checkStyle}
                ></Checkbox>
                <SpotCheckListItem detailClick={goDetail} item={item} status={status} key={item.id}/>
            </Card>
        )
    }
    return (
        <View style={CommonStyle.containerList}>
            <View style={styles.container}>
                <ListView
                    onFetch={onFetch}
                    ref={(ref) => (tabRef.current = ref)}
                    keyExtractor={(item) => item.id}
                    emptyView={() => <RNResult message='暂无数据'></RNResult>}
                    numColumns={1}
                    renderItem={(item, index) => renderItem(item, index)}
                />
                <WhiteSpace size='lg' style={{ paddingTop: 80 }} />
            </View>
            <View style={styles.bottomCheck}>
                <Checkbox checked={checkedAll} onChange={handleAllChange}>全选</Checkbox>
                <Button onPress={onSubmit} type='primary' style={styles.btnStyle}>转待核验</Button>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex:9,
        backgroundColor: '#eee'
    },
    bottomCheck: {
        position: 'absolute',
        top: screenHeight-240,
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 40,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        borderTopColor: '#eee',
        borderTopWidth: 1,
        zIndex: 999,
        flex: 1,
    },
    checkStyle: {
        marginLeft: 8,
    },
    btnStyle: {
        width: 120,
        height: 36,
        backgroundColor: Themes.brand_primary,
        borderColor: Themes.brand_primary,
        fontSize: 10,
        borderRadius: 20
    },
})
export default GoodsInfoListTab
