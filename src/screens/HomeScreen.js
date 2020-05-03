/* eslint-disable react/prop-types */
import React from 'react';
import { FlatList, View, Image, StyleSheet } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';
import useResources from '../components/useResources';

const HomeScreen = ({ navigation }) => {
  const locations = useResources('locations');

  const renderGridItem = (itemData) => (
    <CategoryGridTile
      image={itemData.item.image}
      title={itemData.item.title}
      onSelect={() => {
        navigation.navigate({
          routeName: 'Categories',
          params: {
            locationId: itemData.item.title,
          },
        });
      }}
    />
  );

  return (
    <FlatList
      data={locations}
      renderItem={renderGridItem}
      numColumns={2}
      keyExtractor={(item) => item._id}
      style={styles.grid}
    />
  );
};

HomeScreen.navigationOptions = () => ({
  headerTitle: 'Tayland Gezi Rehberi',
  headerLeft: (
    <View style={{ flexDirection: 'row' }}>
      <Image source={require('../assets/icon-s.png')} style={styles.header} />
    </View>
  ),
});

const styles = StyleSheet.create({
  header: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginLeft: 15,
  },
  grid: {
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
