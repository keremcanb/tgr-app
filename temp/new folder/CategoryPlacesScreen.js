import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import axios from 'axios'
import CategoryGridTileThumb from '../components/CategoryGridTileThumb'

const PlacesScreen = props => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    const getPlaces = async () => {
      const result = await axios.get('https://tgr-admin.appspot.com/api/places')

      setPlaces(result.data)
    }

    getPlaces()
  }, [])

  const categories = props.navigation.getParam('categoryId')
  const locations = props.navigation.getParam('locationId')

  const displayedPlaces = places.filter(
    arr => arr.category === categories && arr.location === locations
  )

  const renderGridItem = itemData => {
    return (
      <CategoryGridTileThumb
        image={itemData.item.thumbnail}
        title={itemData.item.title}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'PlaceDetail',
            params: {
              placeId: itemData.item._id
            }
          })
        }}
      />
    )
  }

  return (
    <FlatList
      data={displayedPlaces}
      renderItem={renderGridItem}
      numColumns={2}
      keyExtractor={(item, index) => item._id}
    />
  )
}

PlacesScreen.navigationOptions = navData => {
  const catId = navData.navigation.getParam('categoryId')

  return {
    headerTitle: catId
  }
}

export default PlacesScreen
