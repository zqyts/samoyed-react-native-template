import { View, Text, StyleSheet, PixelRatio } from 'react-native';
interface IRNListItemProps {
  label: string;
  display?: string;
  children?: any
}
const RNListItem: React.FC<IRNListItemProps> = (props) => {
  const { label, display, children } = props;
  return (
    <View style={display === 'inline' ? styles.inline : styles.wrap}>
      <Text style={display === 'inline' ? styles.titleInline : styles.title}>{label}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginLeft: 15,
    paddingVertical: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: 'rgba(0,0,0,0.15)'
  },
  inline: {
    marginLeft: 15,
    paddingVertical: 10,
    paddingRight: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: 'rgba(0,0,0,0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleInline: {
    color: 'rgba(0,0,0,0.85)',
    fontSize: 16,
    marginRight: 10
  },
  title: {
    color: 'rgba(0,0,0,0.85)',
    fontSize: 16,
    marginRight: 10,
    marginBottom: 10
  }
});

export default RNListItem;
