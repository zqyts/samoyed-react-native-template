import React from 'react'
import { Text, View } from 'react-native'
import { ListView } from '@ant-design/react-native'

export default function RNListScroll() {
  const sleep = (time: any) => new Promise((resolve) => setTimeout(() => resolve(''), time))
  const onFetch = async (page = 1, startFetch: (arg0: string[], arg1: number) => void, abortFetch: () => void) => {
    try {
      //This is required to determinate whether the first loading list is all loaded.
      let pageLimit = 30
      const skip = (page - 1) * pageLimit
      //Generate dummy data
      let rowData = Array.from({ length: pageLimit }, (_, index) => `item -> ${index + skip}`)
      //Simulate the end of the list if there is no more data returned from the server
      if (page === 3) {
        rowData = []
      }
      //Simulate the network loading in ES7 syntax (async/await)
      await sleep(2000)
      startFetch(rowData, pageLimit)
    } catch (err) {
      abortFetch() //manually stop the refresh or pagination if it encounters network error
    }
  }
  const renderItem = (item: any) => {
    return (
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 24 }}>{item}</Text>
      </View>
    )
  }
  return (
    <ListView
      onFetch={onFetch}
      keyExtractor={(item: any, index: any) => `${item} - ${index}`}
      renderItem={renderItem}
      numColumns={1}
    />
  )
}
