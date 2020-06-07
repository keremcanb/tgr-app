import React from 'react';
import { FlatList, View, Image, StyleSheet } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';
import useResources from '../components/useResources';

const HomeScreen = ({ navigation }) => {
  const locations = useResources('locations');

  const renderGridItem = (itemData) => (
    <CategoryGridTile
      thumbnail={itemData.item.thumbnail}
      title={itemData.item.title}
      onSelect={() => {
        navigation.navigate({
          routeName: 'Categories',
          params: {
            locationTitle: itemData.item.title,
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
    />
  );
};

HomeScreen.navigationOptions = () => ({
  headerTitle: 'Tayland Gezi Rehberi',
  headerLeft: (
    <View style={{ flexDirection: 'row' }}>
      <Image source={require('../assets/icon-s.png')} style={styles.icon} />
    </View>
  ),
});

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginLeft: 15,
  },
});

export default HomeScreen;
