import React from 'react';
import {
  FlatList,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import GridTile from '../components/GridTile';
import useResources from '../components/useResources';

const Locations = ({ navigation }) => {
  const locations = useResources('locations');

  const renderItem = (items) => (
    <GridTile
      title={items.item.title}
      thumbnail={items.item.thumbnail}
      onSelect={() => {
        navigation.navigate({
          routeName: 'Categories',
          params: {
            locationTitle: items.item.title,
          },
        });
      }}
    />
  );

  return (
    <>
      {locations.length > 0 ? (
        <FlatList
          data={locations}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <View style={[styles.container]}>
          <ActivityIndicator size='large' color='#0000ff' />
          <Text style={[styles.text]}>Yükleniyor...</Text>
        </View>
      )}
    </>
  );
};

Locations.navigationOptions = () => ({
  headerTitle: 'Tayland Gezi Rehberi',
  headerLeft: (
    <View style={{ flexDirection: 'row' }}>
      <Image source={require('../assets/icon-s.png')} style={styles.icon} />
    </View>
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 2,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginLeft: 15,
  },
});

export default Locations;
