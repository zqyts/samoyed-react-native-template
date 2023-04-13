import { Dimensions, PixelRatio, StyleSheet } from 'react-native'
import Themes from "@/constants/Themes";
const onePixel = 1 / PixelRatio.get()
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
const borderLineColor = '#D0D0D1'
const CommonStyle = StyleSheet.create({
  container: {
    //默认页面背景样式
    flex: 1,
    // backgroundColor: #F7F7F7,
    paddingLeft: 15,
    paddingRight: 15
  },
  topLine: {
    //顶部分割线
    borderTopWidth: onePixel, //一个像素尺寸,
    borderTopColor: borderLineColor
  },
  bottomLine: {
    //底部分割线
    borderBottomWidth: onePixel,
    borderBottomColor: borderLineColor
  },
  leftLine: {
    //左边分割线
    borderLeftWidth: onePixel,
    borderLeftColor: borderLineColor
  },
  line: {
    height: onePixel,
    backgroundColor: borderLineColor
  },
  divider: {
    height: 10,
    backgroundColor: '#F7F7F7'
  },
  buttonText: {
    fontSize: 14,
    color: '#FFFFFF'
  },
  pdLR: {
    paddingLeft: 15,
    paddingRight: 15
  },
  pdLRS: {
    paddingLeft: 30,
    paddingRight: 30
  },
  item: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 12,
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  businessIconTouch: {
    color: '#333333',
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  sectionHeaderWrap: {
    paddingTop: 18,
    paddingBottom: 22,
    paddingRight: 15,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sectionHeaderTitle: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.65)',
    fontWeight: '500'
  },
  end: {
    alignItems: 'center',
    paddingVertical: 10
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 100
  },
  select: {
    borderColor: '#FFFFFF',
    color: '#333333',
    minWidth: 120,
    fontSize: 15
  },
  bgWhite: {
    backgroundColor: '#FFFFFF'
  },
  resTipsText: {
    color: '#D7000F',
    fontSize: 12,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  mrBottom15: {
    marginBottom: 15
  },
  absoluteBgBottomBtn: {
    position: 'absolute',
    width: screenWidth,
    bottom: 0,
    left: 0,
    backgroundColor: '#F7F7F7',
    paddingTop: 10,
    paddingBottom: 15
  },
  bottomBtn: {
    position: 'absolute',
    width: screenWidth - 30,
    top: screenHeight - 200,
    left: 15
  },
  bottomOneHalfBtn: {
    width: screenWidth / 1.1,
    marginLeft: screenWidth / 126.5,
    backgroundColor: Themes.brand_primary ,
    borderColor: Themes.brand_primary,
    borderRadius: 32,
  },
  /** space **/
  // 上边距
  marginTop: {
    marginTop: 10,
  },
  // 左边距
  mrLeft: {
    marginLeft: 10,
  },
  mrBottom: {
    marginBottom: 10,
  },
  mrRight: {
    marginRight: 10,
  },
  // 内边距
  padding:{
    padding: 10,
  },
  // 外边距
  margin10:{
    margin: 10,
  },
  inputHeight:{
    height: 34,
    flex: 1
  },
  listHeaderTitle: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.65)',
    fontWeight: '500',
  },
  cardStyle: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    borderColor: '#eee',
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
    shadowRadius: 1,
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardStyleRadius: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  statusColor:{
    color: Themes.brand_primary,
    fontWeight: '500',
    fontSize: 15,
    marginLeft: 20
  },
  // tab下划线样式
  tabBarline:{
    height: 0,
    transform: [{ scaleX: 0.8 }],
  },
  tabBarStyle:{
    fontWeight: 'bold',
    zIndex: 9
  },
  tabBarTextColor:{
    color: 'rgb(239,14,14)'
  },
  containerList: {
    backgroundColor: '#eee',
    flex: 1,
    paddingBottom: 60,
    position: 'relative',
  },
  flexWrap:{
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    flexWrap:'wrap'
  },
  // 底部操作
  bottomCheck:{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent:'space-around',
    padding: 12,
    alignItems: 'center',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    zIndex: 10,
    flex: 1,
  },
  // 底部操作按钮
  btnStyle: {
    width: 120,
    height: 36,
    backgroundColor: Themes.brand_primary,
    borderColor:Themes.brand_primary,
    fontSize: 10,
    borderRadius: 20
  },
})
export default CommonStyle
