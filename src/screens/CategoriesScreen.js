import React from 'react';
import { FlatList } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';
import useResources from '../components/useResources';

const CategoriesScreen = ({ navigation }) => {
  const categories = useResources('categories');
  const selectedLocation = navigation.getParam('locationTitle');
  const displayedCategories = categories.filter((category) =>
    category.location.some((loc) => loc.value === selectedLocation)
  );

  const renderGridItem = (itemData) => (
    <CategoryGridTile
      title={itemData.item.title}
      thumbnail={itemData.item.thumbnail}
      onSelect={() => {
        navigation.navigate({
          routeName: 'CategoryPlaces',
          params: {
            categoryTitle: itemData.item.title,
            locationTitle: selectedLocation,
          },
        });
      }}
    />
  );

  return (
    <FlatList
      data={displayedCategories}
      renderItem={renderGridItem}
      numColumns={2}
      keyExtractor={(item) => item._id}
    />
  );
};

CategoriesScreen.navigationOptions = (navData) => {
  const locationTitle = navData.navigation.getParam('locationTitle');

  return {
    headerTitle: locationTitle,
  };
};

export default CategoriesScreen;
