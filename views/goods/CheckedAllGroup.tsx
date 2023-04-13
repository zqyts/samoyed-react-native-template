import CommonStyle from "@/constants/CommonStyle";
import {Button, Checkbox, Modal, Toast, View} from "@ant-design/react-native";
import React, {useState} from "react";
import {fetchPreEntryToCheck} from "@/services/spotCheck";

interface CheckedAllGroupInterface {
    checkList: []
    onCheckAllChange: (event: any) => void
    onReloadList: any
}

const CheckedAllGroup = (props: CheckedAllGroupInterface) => {

    const {checkList, onCheckAllChange,onReloadList} = props

    const [isSubmiting, setIsSubmiting] = useState<boolean>(false)
    const [checkedAll, setCheckedAll] = useState<boolean>(false)

    //提交转待查验
    const onSubmit = () => {
        let checkedListItem: string | any[] = []
        if (checkList) {
            checkedListItem = checkList.filter((item: { checked: any }) => item.checked).map((item: { transportName: any }) => {
                return item.transportName
            })
        }
        console.log(checkedListItem,checkList,'申报记录')
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
            ids: checkList.filter((item: { checked: any }) => item.checked).map((item: { id: any }) => {
                return item.id
            })
        }).then(res => {
            setIsSubmiting(false)
            Toast.remove(onDeal)
        }).finally(() => {
            Toast.remove(onDeal)
            setIsSubmiting(false)
            onReloadList()
        })
    }
    return (
        <View style={CommonStyle.bottomCheck}>
           {/* <Checkbox checked={checkedAll} onChange={(event) => {
                setCheckedAll(event.target.checked)
                onCheckAllChange(event)
            }}>全选</Checkbox>*/}
            <Button type='primary' style={CommonStyle.btnStyle} onPress={onSubmit}>转待核验</Button>
        </View>
    )
}

export default CheckedAllGroup