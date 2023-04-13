import { StyleSheet, View, Text, Pressable, PixelRatio } from 'react-native'
import { Icon } from '@ant-design/react-native'

interface IGoodsEditItemProps {
  item: any
  index: number
  onPress?: (index: number) => void
  onDelete?: (index: number) => void
  isDetail?: boolean
  hasRightIcon?: boolean
}
export default function GoodsEditItem(props: IGoodsEditItemProps) {
  const { item, index, onPress, onDelete, isDetail, hasRightIcon } = props
  return (
    <Pressable style={styles.outsideWrap} onPress={() => onPress && onPress(index)}>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>
          <Text style={styles.titleColor}>{`${index + 1}、`}</Text>{item.name}
        </Text>
        {hasRightIcon ? <Icon size={14} name='right' /> : null}
      </View>
      <View style={styles.itemWrap}>
        <Text style={styles.item}>{`重量(kg)：${item.measure || '-'}`}</Text>
        <Text style={styles.item}>{`货物数量/包装：${item.quantity || '-'}`}</Text>
        <Text style={styles.item}>{`备注：${item.remark || '-'}`}</Text>
      </View>
      {!isDetail ? (
        <View style={styles.editWrap}>
          <Pressable onPress={() => onPress && onPress(index)}>
            <Text style={[styles.btn, styles.btnEdit]}>编辑商品项</Text>
          </Pressable>
          <Pressable onPress={() => onDelete && onDelete(index)}>
            <Text style={[styles.btn, styles.btnDelete]}>删除</Text>
          </Pressable>
        </View>
      ) : null}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  outsideWrap: {
    padding: 8,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: 'rgba(102,102,102,0.15)'
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  title: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.85)',
    fontWeight: 'bold',
    marginRight: 4
  },
  itemWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    width: '50%',
    marginBottom: 6,
    fontSize: 12,
    color: '#666666'
  },
  editWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 1
  },
  btnEdit: {
    borderColor: '#26B3A3',
    color: '#26B3A3'
  },
  btn: {
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12
  },
  btnDelete: {
    borderColor: '#F56C6C',
    color: '#F56C6C',
    marginLeft: 15
  },
  titleColor:{
    color: 'rgb(0,149,138)',
  }
})
