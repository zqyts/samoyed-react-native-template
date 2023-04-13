// 获取字典类型的hooks
import {useState, useEffect, useCallback} from 'react';
import {useStore} from "@/models/store";
import {getDictDataByType} from "@/services/dict";

interface DictResp {
  dictLabel: any;
  dictValue: any;
}

const useDict: <T> (...args: string[]) => T = (...args: string[]) => {
  const getDict = useStore((state: { getDict: any; }) => state.getDict)
  const setDict = useStore((state: { setDict: any; }) => state.setDict)
  const [dictData, setDictData] = useState<any>(null);

  const dictFunc = useCallback(() => {
    args.forEach((dictType: any, index: number) => {
      setDictData([])
      const dicts = getDict(dictType)
      if (dicts) {
        setDictData(dicts)
      } else {
        getDictDataByType({
          type: dictType
        }).then((res: any) => {
          const dictData = res.data || {}
          const data =  dictData?.dictDataList.map((p: DictResp) => ({
            label: p.dictLabel,
            value: p.dictValue,
          }))
          setDictData(data)
          setDict(dictType, data)
        })
      }
    })
  }, [args])

  useEffect(() => {
    dictFunc()
  }, []);
  return dictData || [args];
};

export default useDict;
