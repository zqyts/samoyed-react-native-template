import { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
interface ITitleProps {
  title: string;
}
const RNListHeader: React.FC<ITitleProps> = memo(({ title }: ITitleProps) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 14,
    paddingBottom: 8,
    paddingHorizontal: 15
    // backgroundColor: 'rgba(38,179,163,0.10)'
  },
  title: {
    color: 'rgba(0,0,0,0.45)'
    // fontSize: 18
  }
});

export default RNListHeader;
