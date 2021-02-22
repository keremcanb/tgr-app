import React from 'react';
import { FlatList } from 'react-native';
import GridTile from '../components/GridTile';
import useResources from '../components/useResources';

const PlacesScreen = ({ navigation }) => {
  const places = useResources('places');
  const categories = navigation.getParam('categoryTitle');
  const locations = navigation.getParam('locationTitle');
  const selectedPlace = places.filter((plc) => plc.category === categories && plc.location === locations);

  return (
    <FlatList
      data={selectedPlace}
      renderItem={(itemData) => (
        <GridTile
          thumbnail={itemData.item.thumbnail}
          title={itemData.item.title}
          onSelect={() => {
            navigation.navigate('PlaceDetail', {
              placeId: itemData.item._id,
              placeTitle: itemData.item.title,
              placeImage: itemData.item.image,
              placeContent: itemData.item.content,
              placeInfo: itemData.item.info,
              placeLink: itemData.item.link,
              placeLat: itemData.item.lat,
              placeLng: itemData.item.lng
            });
          }}
        />
      )}
      numColumns={2}
      keyExtractor={(item) => item._id}
    />
  );
};

PlacesScreen.navigationOptions = (navData) => {
  const categoryTitle = navData.navigation.getParam('categoryTitle');

  return {
    headerTitle: categoryTitle
  };
};

export default PlacesScreen;
