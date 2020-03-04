import React, { useState, useEffect } from 'react'
import { FlatList, View, Image, StyleSheet } from 'react-native'
import axios from 'axios'
import CategoryGridTile from '../components/CategoryGridTile'

const HomeScreen = props => {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const getLocations = async () => {
      const result = await axios.get(
        'https://tgr-admin.appspot.com/api/locations'
      )

      setLocations(result.data)
    }

    getLocations()
  }, [])

  const renderGridItem = itemData => {
    return (
      <CategoryGridTile
        image={itemData.item.image}
        title={itemData.item.title}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'Categories',
            params: {
              locationId: itemData.item.title
            }
          })
        }}
      />
    )
  }

  return (
    <FlatList
      style={styles.grid}
      data={locations}
      renderItem={renderGridItem}
      numColumns={2}
      keyExtractor={(item, index) => item._id}
    />
  )
}

HomeScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Tayland Gezi Rehberi',
    headerLeft: (
      <View style={{ flexDirection: 'row' }}>
        <Image source={require('../assets/icon-s.png')} style={styles.header} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginLeft: 15
  },
  grid: {
    backgroundColor: '#fff'
  }
})

export default HomeScreen
