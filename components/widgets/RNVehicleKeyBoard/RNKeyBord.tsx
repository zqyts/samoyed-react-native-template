import React, {Key, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {autoHeight, autoWidth, scaleSize} from "@/components/widgets/RNVehicleKeyBoard/utils/ScreenUtil";
import {isEmpty} from 'lodash';

interface IRNPropsInterface {
  titles: string[]
  onSelected: (index: Key | null | undefined) => void
  onDeleted: () => void
}

const RNKeyBord = (props: IRNPropsInterface) => {

  const {titles, onSelected, onDeleted} = props

  const _renderCell = (index: any) => {
    let cell;
    if (index + 1 == titles.length) {
      let img = require('@/assets/images/button_delete.png')
      cell = (
        <TouchableOpacity onPress={onDeleted}>
          <Image source={img} resizeMode='stretch'
                 style={{width: autoWidth(138), height: autoHeight(70), borderRadius: 5}}/>
        </TouchableOpacity>
      );
    } else if (isEmpty(titles[index])) {
      cell = (
        <View
          style={{width: autoWidth(60), height: autoHeight(70), marginLeft: autoHeight(20),}}
        />
      );
    } else {
      let mLeft = autoWidth(15);
      if (titles.length > 37) {
        mLeft = autoWidth(6)
      }
      cell = (
        <View
          style={[{marginLeft: mLeft}, styles.itemBg]}>
          <Text style={{
            fontSize: scaleSize(36),
            textAlignVertical: 'center',
            color: '#333333',
            display: 'flex',
            alignItems: 'center',
            height: '100%'
          }}>
            {titles[index]}
          </Text>
        </View>
      );
    }
    return cell;
  }

  return (
    <View style={styles.container}>
      {titles.map((title: any, i: Key | null | undefined) => (
        <TouchableOpacity
          key={i}
          onPress={() => onSelected(i)}>
          {_renderCell(i)}
        </TouchableOpacity>
      ))}
    </View>
  )
}


export const styles = StyleSheet.create({
  container: {
    paddingLeft: autoWidth(10),
    paddingRight: autoWidth(20),
    paddingTop: autoHeight(30),
    paddingBottom: autoHeight(12),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#cfcfcf'
  },
  itemBg: {
    borderWidth: 0,
    // borderColor:commonStyle.themeColor,
    borderRadius: 5,
    width: autoWidth(60),
    height: autoHeight(70),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft:autoWidth(10),
    marginBottom: autoHeight(18),
    backgroundColor: 'white'
  }
});

export default React.memo(RNKeyBord);
