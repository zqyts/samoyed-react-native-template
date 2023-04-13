import { useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { View } from 'react-native'
import { useCallback } from 'react'
import { IPostItem, usePosts } from '@/services/spotCheck'
import { RNEmptyList } from '@/components/widgets'
import { FlashListDemo } from '@/components/business'
export default function SpotCheckIndex() {
  const { data, isLoading } = usePosts()
  const { navigate } = useNavigation()

  const renderItem = useCallback(
    ({ item }: { item: IPostItem }) => <FlashListDemo {...item} onPress={() => {}} />,
    [navigate]
  )
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<RNEmptyList isLoading={isLoading} />}
        estimatedItemSize={300}
      />
    </View>
  )
}
