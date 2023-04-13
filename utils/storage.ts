import AsyncStorage from '@react-native-async-storage/async-storage'
// 存数据
const storeData = async (key: string, value: any) => {
  try {
    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
    console.log(e)
  }
}
// 取数据
const getStoreData = async (key: string) => {
  let value = null
  try {
    value = await AsyncStorage.getItem(key)
    if (value !== null && value !== undefined) {
      value = JSON.parse(value)
    }
  } catch (e) {
    // error reading value
    console.log(e)
  }
  return value
}
// const load = (params: LoadParams) => {
//   return storage.load(params);
// };

export { storeData, getStoreData }
