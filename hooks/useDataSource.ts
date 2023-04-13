/*
 * @Author: caih.zhouqiyuan
 * @Date: 2022-03-28 16:15:09
 * @Last Modified by: caih.zhouqiyuan
 * @Last Modified time: 2023-02-28 17:56:08
 */
// 获取请求数据hook
import { useState, useEffect } from 'react';
const useDataSource: <T>(getResourceFunc: () => any) => T = (getResourceFunc) => {
  const [resource, setResource] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const res = await getResourceFunc();
      setResource(res.data);
    })();
  }, []);

  return resource;
};

export default useDataSource;
