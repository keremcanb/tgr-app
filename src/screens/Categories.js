import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FlatList } from 'react-native';
import GridTile from '../components/GridTile';

const Categories = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const result = await axios.get(
        'https://tgr-admin.herokuapp.com/api/categories'
      );
      setCategories(result.data);
    };
    getCategories();
  }, []);

  const selectedLocation = navigation.getParam('locationTitle');
  const displayedCategories = categories.filter((category) =>
    category.location.some((loc) => loc.value === selectedLocation)
  );

  const renderGridItem = (itemData) => (
    <GridTile
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

Categories.navigationOptions = (navData) => {
  const locationTitle = navData.navigation.getParam('locationTitle');

  return {
    headerTitle: locationTitle,
  };
};

export default Categories;
