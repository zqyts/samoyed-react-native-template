import {Platform} from 'react-native';
import DeviceInfo from "./DeviceInfo";

//像素密度
// export const DEFAULT_DENSITY = 2;
export const DEFAULT_DENSITY = 2;
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的750和1334为对应尺寸即可.
const uiWidthPx = 750;
const uiHeightPx = 1334;
const w2 = uiWidthPx / DEFAULT_DENSITY;
const h2 = uiHeightPx / DEFAULT_DENSITY;
const scaleWidth = DeviceInfo.deviceWidth / w2;
const scaleHeight = DeviceInfo.deviceHeight / h2;
const scale = Math.min(scaleWidth, scaleHeight);

/**
 * 屏幕适配,文字缩放size
 * @param size 传入设计稿上的px
 * @returns {Number} 返回实际sp
 */
export function scaleSize(size: any) {
  size = Math.round((size * scale + 0.5));
  return size / DEFAULT_DENSITY + 1;
}

export function autoWidth(uiElementPx: number) {
  const transferNumb = uiElementPx * DeviceInfo.deviceWidth / uiWidthPx;

  if (transferNumb >= 1) {
    // 避免出现循环小数
    return Math.ceil(transferNumb);
  } else if (Platform.OS === 'android') {
    // 如果是安卓，最小为1，避免边框出现锯齿
    return 1;
  }
  return 0.5;
}

export function autoHeight(uiElementPx: number) {
  const transferNumb = uiElementPx * DeviceInfo.deviceHeight / uiHeightPx;

  if (transferNumb >= 1) {
    // 避免出现循环小数
    return Math.ceil(transferNumb);
  } else if (Platform.OS === 'android') {
    // 如果是安卓，最小为1，避免边框出现锯齿
    return 1;
  }
  return 0.5;
}

export function pxToDp(uiElementPx: number) {
  const transferNumb = uiElementPx * DeviceInfo.deviceWidth / uiWidthPx;

  if (transferNumb >= 1) {
    // 避免出现循环小数
    return Math.ceil(transferNumb);
  } else if (Platform.OS === 'android') {
    // 如果是安卓，最小为1，避免边框出现锯齿
    return 1;
  }
  return 0.5;
}

/**
 * 判断android API是否小于19(4.4以下)，如果是则不能使用沉浸状态栏
 *
 */
export function isLT19() {
  return Platform.OS === 'android' && Platform.Version < 19
}
