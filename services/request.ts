/*
 * @Author: caih.zhouqiyuan
 * @Date: 2023-02-08 17:37:06
 * @Last Modified by: caih.zhouqiyuan
 * @Last Modified time: 2023-03-10 17:03:36
 */
import {Toast} from '@ant-design/react-native'
import globalData from '@/constants/Global'
import axios, {AxiosRequestHeaders} from 'axios'
import {getStoreData, storeData} from '@/utils/storage'
import {IHttpResponse} from './common'
import * as RootNavigation from '@/navigation/RootNavigation'
import {IUserInfo} from './user'
import {tansParams} from "@/utils/util";

interface fecthMethod {
  GET: string
  POST: string
  PUT: string
  PATCH: string
}

export const instance = axios.create({
  // baseURL: 'http://10.208.32.9:25580',
  baseURL: 'http://10.96.129.63:25580',
  // baseURL: 'https://dummyjson.com/', // 模拟接口
  timeout: 12000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 当前接口请求数
let requestNum = 0

let loadingInstance: number;

//请求拦截处理
instance.interceptors.request.use(
  async function (config) {
    // 加载动画
    const isLoading = (config.headers || {}).isLoading === false
    if (!isLoading) {
      if (requestNum <= 0) {
        loadingInstance = Toast.loading({
          content: '加载中',
          duration: -1,
        })
      }
      requestNum += 1
    }
    // get请求映射params参数

    if (config.method === 'GET' && config.params) {
      let url = config.url + '?' + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    // 发送请求前
    if (globalData.token) {
      config.headers.Authorization = globalData.token || ''
    } else {
      const res = (await getStoreData('STORAGE_DATA')) as { state: { USER_INFO: IUserInfo } }
      if (res && res.state.USER_INFO) {
        config.headers.Authorization = res.state.USER_INFO.token
        globalData.token = res.state.USER_INFO.token
      }
    }
    return config
  },
  function (error) {
    // 请求错误
    return Promise.reject(error)
  }
)

//返回拦截处理
instance.interceptors.response.use(
  function (response) {
    // 对响应数据
    // if (response.status === 200) {
    //   return response.data.data || response.data
    // } else {
    //   // 非200请求抱错
    //   throw Error('服务异常')
    // }
    const {responseURL} = response.request
    const {data, headers} = response.config
    // 隐藏加载中
    hideLoading(headers)
    // 打印接口请求日志
    console.log('----------------------------------http start-------------------------------------')
    console.log('请求接口：' + responseURL)
    console.log('请求头：' + JSON.stringify(headers))
    console.log('请求参数：' + data)
    console.log('返回数据：' + JSON.stringify(response.data))
    console.log('----------------------------------http end--------------------------------------')
    console.log('')
    // token失效和未登录
    if (response.data.code === 401) {
      storeData('USER', null)
      globalData.token = ''
      setTimeout(() => {
        RootNavigation.navigate('Login', {name: 'redirect'})
      }, 1500)
    }
    if (!response.data.resultFlag) {
      Toast.fail(response.data.message || `服务报错${response.data.code}`)
    }
    return response
  },
  function (error) {
    hideLoading(error.config.headers)
    // 响应错误
    // if (error.response && error.response.status === 401) {
    //     setStorageKey(KEYS.IS_LOGGED_IN, false);
    //   }
    // 打印接口请求错误日志
    Toast.fail('接口请求异常')
    return Promise.reject(error)
  }
)

/**
 * 隐藏请求加载框
 * @param headers
 */
const hideLoading = (headers: AxiosRequestHeaders) => {
  const isLoading = headers.isLoading === false
  if (!isLoading) {
    requestNum = requestNum - 1
    if (requestNum <= 0) {
      Toast.remove(loadingInstance);
    }
  }
}

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @param headers
 * @returns {Promise}
 */
function get(url: string, params = {}, headers = {}): Promise<IHttpResponse> {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params,
        headers: {...headers}
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @param headers
 * @returns {Promise}
 */
export function post(url: string, data = {}, headers = {}): Promise<IHttpResponse> {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {...headers}
    }).then(
      (response) => {
        // 关闭进度条
        resolve(response.data)
      },
      (err) => {
        reject(err)
      }
    )
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url: string, data = {}): Promise<IHttpResponse> {
  return new Promise((resolve, reject) => {
    instance.patch(url, data).then(
      (response) => {
        resolve(response.data)
      },
      (err) => {
        reject(err)
      }
    )
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url: string, data = {}): Promise<IHttpResponse> {
  return new Promise((resolve, reject) => {
    instance.put(url, data).then(
      (response) => {
        resolve(response.data)
      },
      (err) => {
        reject(err)
      }
    )
  })
}

//统一接口处理，返回数据
export default function httpRequest(fecth: keyof fecthMethod, url: string, param = {}, headers = {}): Promise<IHttpResponse> {
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case 'GET':
        get(url, param, headers)
          .then(function (response) {
            if (response.resultFlag) {
              resolve(response)
            } else {
              reject({
                message: response.message || `服务报错${response.code}`,
                code: response.code
              })
            }
          })
          .catch(function (err) {
            reject(err)
          })
        break
      case 'POST':
        post(url, param, headers)
          .then(function (response) {
            if (response.resultFlag) {
              resolve(response)
            } else {
              reject({
                message: response.message || `服务报错${response.code}`,
                code: response.code
              })
            }
          })
          .catch(function (err) {
            reject(err)
          })
        break
      default:
        break
    }
  })
}
