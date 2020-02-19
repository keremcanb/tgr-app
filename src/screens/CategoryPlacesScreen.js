import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import axios from 'axios'
import CategoryGridTileThumb from '../components/CategoryGridTileThumb'

const PlacesScreen = props => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    const getPlaces = async () => {
      const result = await axios.get(
        'https://tgr-admin.azurewebsites.net/api/places'
      )

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
              placeId: itemData.item._id,
              placeTitle: itemData.item.title,
              placeImage: itemData.item.image,
              placeContent: itemData.item.content,
              placeInfo: itemData.item.info,
              placeLink: itemData.item.link,
              placeLat: itemData.item.lat,
              placeLng: itemData.item.lng
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
