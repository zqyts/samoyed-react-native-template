import { fetchLogin, fetchLoginOut, getBaseUserInfo, ILoginFormValues, IUserInfo } from '@/services/user'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware' // persis支持数据持久化存储
// import { mmkvStorage } from '@/utils/mmkvStorage' // react-native-mmkv is not supported in Expo Go! Use EAS (`expo prebuild`) or eject to a bare workflow instead.
import AsyncStorage from '@react-native-async-storage/async-storage'
import globalData from '@/constants/Global'
interface IStoreState {
  USER_INFO: Partial<IUserInfo> | null
  fetchLogin: (params: ILoginFormValues, cb: Function) => void
  fetchLoginOut: (cb?: Function) => void,
  dict: {
    key: string,
    value: string
  }[],
  getDict: (dictKey: string) => string | null | undefined
  setDict: (dictKey: string, value: string) => void
}
const useStore = create<IStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        USER_INFO: null,
        dict: [],
        //   addVotes: () =>
        //     set((state) => ({
        //       votes: state.votes + 1
        //     })),
        fetchLogin: async (payload: ILoginFormValues, cb) => {
          const res = await fetchLogin(payload)
          globalData.token = res.data
          const info = await getBaseUserInfo()
          set({
            USER_INFO: {
              token: res.data,
              ...info.data
            }
          })
          cb()
        },
        fetchLoginOut: async (cb) => {
          await fetchLoginOut()
          globalData.token = ''
          set({
            USER_INFO: null
          })
          cb && cb()
        },
        getDict: (dictKey: string) => {
          if (dictKey == null && dictKey === '') {
            return null;
          }
          try {
            for (let i = 0; i < get().dict.length; i++) {
              if (get().dict[i].key === dictKey) {
                return get().dict[i]?.value
              }
            }
          } catch (e) {
            return null;
          }
        },
        setDict: (dictKey: string, value: string) => {
          if (dictKey !== null && dictKey !== '') {
            const dictLength = get().dict.filter(dict => dict.key === dictKey).length
            if (dictLength) {
              return
            }
            set(state => ({
              dict: [...state.dict, {
                key: dictKey,
                value: value
              }]
            }))
          }
        }
      }),
      {
        name: 'STORAGE_DATA', // unique name
        storage: createJSONStorage(() => AsyncStorage)
      }
    )
  )
)
export { useStore }
