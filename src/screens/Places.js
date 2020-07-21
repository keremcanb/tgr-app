import React from 'react';
import { FlatList } from 'react-native';
import GridTile from '../components/GridTile';
import useResources from '../components/useResources';

const PlacesScreen = ({ navigation }) => {
  const places = useResources('places');
  const categories = navigation.getParam('categoryTitle');
  const locations = navigation.getParam('locationTitle');
  const selectedPlace = places.filter(
    (place) => place.category === categories && place.location === locations
  );

  const renderItem = (items) => (
    <GridTile
      thumbnail={items.item.thumbnail}
      title={items.item.title}
      onSelect={() => {
        navigation.navigate({
          routeName: 'PlaceDetail',
          params: {
            placeId: items.item._id,
            placeTitle: items.item.title,
            placeImage: items.item.image,
            placeContent: items.item.content,
            placeInfo: items.item.info,
            placeLink: items.item.link,
            placeLat: items.item.lat,
            placeLng: items.item.lng,
          },
        });
      }}
    />
  );

  return (
    <FlatList
      data={selectedPlace}
      renderItem={renderItem}
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
