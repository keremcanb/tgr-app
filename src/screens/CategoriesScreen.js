import React from 'react';
import { FlatList } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';
import useResources from '../components/useResources';

const CategoriesScreen = ({ navigation }) => {
  const categories = useResources('categories');
  const selectedLocation = navigation.getParam('locationTitle');
  const displayedCategories = categories.filter(
    (item) => item.location.indexOf(selectedLocation) >= 0
  );

  const renderGridItem = (itemData) => (
    <CategoryGridTile
      image={itemData.item.image}
      title={itemData.item.title}
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
  const locId = navData.navigation.getParam('locationId');

  return {
    headerTitle: locId,
  };
};

export default CategoriesScreen;
