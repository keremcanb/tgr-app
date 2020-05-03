import React from "react";
import { FlatList } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
import useResources from "../components/useResources";

const PlacesScreen = ({ navigation }) => {
  const places = useResources("places");
  const categories = navigation.getParam("categoryId");
  const locations = navigation.getParam("locationId");
  const displayedPlaces = places.filter(
    (item) => item.category === categories && item.location === locations
  );

  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        image={itemData.item.thumbnail}
        title={itemData.item.title}
        onSelect={() => {
          navigation.navigate({
            routeName: "PlaceDetail",
            params: {
              placeId: itemData.item._id,
              placeTitle: itemData.item.title,
            },
          });
        }}
      />
    );
  };

  return (
    <FlatList
      data={displayedPlaces}
      renderItem={renderGridItem}
      numColumns={2}
      keyExtractor={(item) => item._id}
    />
  );
};

PlacesScreen.navigationOptions = (navData) => {
  const catId = navData.navigation.getParam("categoryId");

  return {
    headerTitle: catId,
  };
};

export default PlacesScreen;
