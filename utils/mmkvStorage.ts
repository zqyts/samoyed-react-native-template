/*
 * @Author: caih.zhouqiyuan
 * @Date: 2023-02-10 09:21:40
 * @Last Modified by: caih.zhouqiyuan
 * @Last Modified time: 2023-02-10 09:38:48
 * 使用 MMKV with zustand persist-middleware
 */
import { StateStorage } from 'zustand/middleware'
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

const mmkvStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value)
  },
  getItem: (name) => {
    const value = storage.getString(name)
    return value ?? null
  },
  removeItem: (name) => {
    return storage.delete(name)
  }
}

export { mmkvStorage }
