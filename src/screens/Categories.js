import React from 'react';
import { FlatList } from 'react-native';
import GridTile from '../components/GridTile';
import useResources from '../components/useResources';

const Categories = ({ navigation }) => {
  const categories = useResources('categories');
  const selectedLocation = navigation.getParam('locationTitle');
  const selectedCategory = categories.filter((cat) => cat.location.some((loc) => loc.value === selectedLocation));

  return (
    <FlatList
      renderItem={(itemData) => (
        <GridTile
          title={itemData.item.title}
          thumbnail={itemData.item.thumbnail}
          onSelect={() => {
            navigation.navigate('CategoryPlaces', {
              categoryTitle: itemData.item.title,
              locationTitle: selectedLocation
            });
          }}
        />
      )}
      data={selectedCategory}
      numColumns={2}
      keyExtractor={(item) => item._id}
    />
  );
};

Categories.navigationOptions = (navData) => {
  const locationTitle = navData.navigation.getParam('locationTitle');
  return {
    headerTitle: locationTitle
  };
};

export default Categories;
