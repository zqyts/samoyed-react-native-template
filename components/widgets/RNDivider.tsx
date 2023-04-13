import { View, StyleSheet, PixelRatio } from 'react-native';
interface IRNDividerProps {
  position?: string;
}
export default function RNDivider({ position }: IRNDividerProps) {
  let sty = null;
  if (position === 'left') {
    sty = styles.lineLeft;
  } else if (position === 'right') {
    sty = styles.lineRight;
  } else if (position === 'bottom') {
    sty = styles.lineBottom;
  } else {
    sty = styles.lineTop;
  }
  return <View style={sty}></View>;
}

const styles = StyleSheet.create({
  lineTop: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: 'rgba(0,0,0,0.15)'
  },
  lineLeft: {
    borderLeftWidth: 1 / PixelRatio.get(),
    borderLeftColor: 'rgba(0,0,0,0.15)'
  },
  lineRight: {
    borderRightWidth: 1 / PixelRatio.get(),
    borderRightColor: 'rgba(0,0,0,0.15)'
  },
  lineBottom: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: 'rgba(0,0,0,0.15)'
  }
});
