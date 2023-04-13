import {SpotCheckHttpApi} from '@/config/httpApi'
import {getQueryKey} from '@/utils/apiUtil'
import type {UseQueryOptions} from '@tanstack/react-query'
import {useQuery} from '@tanstack/react-query'
import type {AxiosError} from 'axios'
import {IParamsByPage} from './common'
import httpRequest, {instance} from './request'

export interface IPostItem {
  userId: number
  id: number
  title: string
  body: string
}

function getPosts(): Promise<IPostItem[]> {
  return instance({
    url: `posts`,
    method: 'GET'
  }).then((response) => response.data.posts)
}

export function usePosts(config?: UseQueryOptions<IPostItem[], AxiosError>) {
  const queryKey = getQueryKey('posts')
  return useQuery<IPostItem[], AxiosError>(queryKey, getPosts, config)
}

// 预录入列表-关键字查询
export const fetchPreEntryListByKeywordPage = async (params: IParamsByPage
  & {
  transportName: string,
  ieFlag: string,
  tradeName?: string,
  principalName?: string,
  needCheck?: string,
  checkStatus?: string
}) => {
  return httpRequest('GET', SpotCheckHttpApi.fetchPreEntryListByPage, params, {
    isLoading: false
  })
}

/**
 * 根据ID查询预检详情
 * @param params
 */
export const fetchPreEntryDetailById = async (params: { id: string }) => {
  return httpRequest('GET', SpotCheckHttpApi.fetchPreEntryDetailById, params)
}

/**
 * 货物转待查验
 * @param params
 */
export const fetchPreEntryToCheck = async (params: { ids: any[] }) => {
  return httpRequest('POST', SpotCheckHttpApi.fetchPreEntryToCheck, params,{
    isLoading: false
  })
}

/**
 * 取消待查验
 * @param params
 */
export const fetchPreEntryCancelCheck = async (params: { ids: any[] }) => {
  return httpRequest('POST', SpotCheckHttpApi.fetchPreEntryCancelCheck, params,{
    isLoading: false
  })
}

/**
 * 录入核验结果
 * @param data
 */
export const fetchEntryCheckConfirm = async (data: {
  id: string, checkResult: string,
  handleOpinion: string }) => {
  return httpRequest('POST', SpotCheckHttpApi.fetchEntryCheckConfirm, data, {
    isLoading: false
  })
}



// 获取国家
export const getCountryList = async (params = {}) => {
  return httpRequest('GET', SpotCheckHttpApi.getCountryList, params)
}
