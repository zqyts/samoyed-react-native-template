import { Icon } from '@ant-design/react-native';
import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';

interface IRNAddressLineProps {
  startName: string;
  endName: string;
  style?: TextStyle;
}

export default function RNAddressLine({ startName, endName, style }: IRNAddressLineProps) {
  return (
    <View style={styles.address}>
      <Text style={style ? style : styles.addressName}>{startName}</Text>
      <Icon size={18} name='swap-right' style={styles.arrowIcon} />
      <Text style={style ? style : styles.addressName}>{endName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  addressName: {
    fontSize: 17,
    color: 'rgba(0,0,0,0.50)'
  },
  arrowIcon: {
    marginHorizontal: 6
  }
});
