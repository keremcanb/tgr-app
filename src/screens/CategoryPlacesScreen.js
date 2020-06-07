import React from 'react';
import { FlatList } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';
import useResources from '../components/useResources';

const PlacesScreen = ({ navigation }) => {
  const places = useResources('places');
  const categories = navigation.getParam('categoryTitle');
  const locations = navigation.getParam('locationTitle');
  const displayedPlaces = places.filter(
    (place) => place.category === categories && place.location === locations
  );

  const renderGridItem = (itemData) => (
    <CategoryGridTile
      image={itemData.item.thumbnail}
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
            placeLng: itemData.item.lng
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
