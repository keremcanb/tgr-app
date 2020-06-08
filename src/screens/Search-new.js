import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import axios from 'axios';

const Search = ({ navigation }) => {
  const [arrayHolder, setArrayholder] = useState([]);

  useEffect(() => {
    async function getItems() {
      const result = await axios.get('/api/categories');
      setArrayholder(result.data);
    }
    getItems();
  }, []);

  // Search Filter Function
  function searchFilterFunction(text) {
    setArrayholder({
      value: text,
    });

    const newData = arrayHolder.filter((item) => {
      const itemData = `${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setArrayholder({
      data: newData,
    });
  }

  // Search Bar
  function renderHeader() {
    return (
      <SearchBar
        lightTheme
        round
        onChangeText={(text) => searchFilterFunction(text)}
        autoCorrect={false}
        autoCapitalize='none'
        value={value}
      />
    );
  }

  const { navigate } = navigation;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ListItem
            Component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            linearGradientProps={{
              colors: ['#072d70', '#2661c7'],
              start: [1, 0],
              end: [0.2, 0],
            }}
            // leftAvatar={{ source: { uri: item.thumbnail } }}
            title={item.title}
            bottomDivider
            chevron={{ color: 'white' }}
            titleStyle={{ color: 'white', fontWeight: 'bold' }}
            onPress={() => {
              navigate({
                routeName: 'SearchResult',
                params: {
                  placeId: item._id,
                  placeTitle: item.title,
                  placeImage: item.image,
                  placeContent: item.content,
                  placeInfo: item.info,
                  placeLat: item.lat,
                  placeLng: item.lng,
                },
              });
            }}
          />
        )}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

Search.navigationOptions = () => ({
  headerTitle: 'Ara',
});

export default Search;
