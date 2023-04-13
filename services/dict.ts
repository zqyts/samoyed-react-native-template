/*
 * @Author: caih.zhouqiyuan
 * @Date: 2023-02-10 11:17:51
 * @Last Modified by: caih.zhouqiyuan
 * @Last Modified time: 2023-02-10 11:18:42
 * 字典
 */

import httpRequest from "@/services/request";
import {DictApi} from "@/config/httpApi";

export interface IDictOptions {
  id?: string
  dictCode?: string
  dictValue: string
  dictName?: string
  dictKey: string
  flag?: boolean
}

// 获取国家
export const getDictDataByType = async (params = {}) => {
  return httpRequest('GET', DictApi.fetchDictData, params)
}


