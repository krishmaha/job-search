import React from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import styles from './popularjobs.style'
import useFetch from '../../../hooks/useFetch.js'

const Popularjobs = () => {
  const router = useRouter();
  const {data, isLoading, error} = useFetch(
    'search', {query: 'React developer',
               num_pages: 1}
  )
  
  console.log(data)

  const [selectedJob, setSelectedJob] = useState();
  const handleCardPress = (item) => {
    router.push(`job-details/${item.job_id}`)
    setSelectedJob(item.job_id)
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Popular Jobs
        </Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn} >Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {(isLoading) ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
        <Text>Something went wrong</Text>
        ) : (
          <FlatList 
            // data={[1,2,3,4,5,6,7,8]}
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard 
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.small }}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs
