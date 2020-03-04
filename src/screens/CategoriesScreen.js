import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import axios from 'axios'
import CategoryGridTile from '../components/CategoryGridTile'

const CategoriesScreen = props => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      const result = await axios.get(
        'https://tgr-admin.appspot.com/api/categories'
      )

      setCategories(result.data)
    }

    getCategories()
  }, [])

  const locations = props.navigation.getParam('locationId')

  const displayedCategories = categories.filter(
    arr => arr.location.indexOf(locations) >= 0
  )

  const renderGridItem = itemData => {
    return (
      <CategoryGridTile
        image={itemData.item.image}
        title={itemData.item.title}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'CategoryPlaces',
            params: {
              categoryId: itemData.item.title,
              locationId: locations
            }
          })
        }}
      />
    )
  }

  return (
    <FlatList
      data={displayedCategories}
      renderItem={renderGridItem}
      numColumns={2}
      keyExtractor={(item, index) => item._id}
    />
  )
}

CategoriesScreen.navigationOptions = navData => {
  const locId = navData.navigation.getParam('locationId')

  return {
    headerTitle: locId
  }
}

export default CategoriesScreen
