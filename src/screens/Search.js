/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  // Fetch API
  makeRemoteRequest = () => {
    const url = 'https://tgradmin.herokuapp.com/api/places';
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          data: []
        });
        this.arrayholder = res;
      });
  };

  // Search Filter Function
  searchFilterFunction = (text) => {
    this.setState({
      value: text
    });
    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData
    });
  };

  // Search Bar
  renderHeader = () => (
    <SearchBar
      lightTheme
      round
      onChangeText={(text) => this.searchFilterFunction(text)}
      autoCorrect={false}
      autoCapitalize="none"
      value={this.state.value}
    />
  );

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              Component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95}
              linearGradientProps={{
                colors: ['#072d70', '#2661c7'],
                start: [1, 0],
                end: [0.2, 0]
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
                    placeLng: item.lng
                  }
                });
              }}
            />
          )}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

Search.navigationOptions = () => ({
  headerTitle: 'Ara'
});

export default Search;
