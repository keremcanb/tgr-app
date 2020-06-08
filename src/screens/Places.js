import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FlatList } from 'react-native';
import GridTile from '../components/GridTile';

const PlacesScreen = ({ navigation }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const getPlaces = async () => {
      const result = await axios.get(
        'https://tgr-admin.herokuapp.com/api/places'
      );
      setPlaces(result.data);
    };
    getPlaces();
  }, []);

  const categories = navigation.getParam('categoryTitle');
  const locations = navigation.getParam('locationTitle');
  const displayedPlaces = places.filter(
    (place) => place.category === categories && place.location === locations
  );

  const renderGridItem = (itemData) => (
    <GridTile
      thumbnail={itemData.item.thumbnail}
      title={itemData.item.title}
      onSelect={() => {
        navigation.navigate({
          routeName: 'PlaceDetail',
          params: {
            placeId: itemData.item._id,
            placeTitle: itemData.item.title,
            placeImage: itemData.item.image,
            placeContent: itemData.item.content,
            placeInfo: itemData.item.info,
            placeLink: itemData.item.link,
            placeLat: itemData.item.lat,
            placeLng: itemData.item.lng,
          },
        });
      }}
    />
  );

  return (
    <FlatList
      data={displayedPlaces}
      renderItem={renderGridItem}
      numColumns={2}
      keyExtractor={(item) => item._id}
    />
  );
};

PlacesScreen.navigationOptions = (navData) => {
  const categoryTitle = navData.navigation.getParam('categoryTitle');

  return {
    headerTitle: categoryTitle,
  };
};

export default PlacesScreen;
