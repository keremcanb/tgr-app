import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import axios from "axios";
import CategoryGridTile from "../components/CategoryGridTile";
import useResources from "../components/useResources";

const PlacesScreen = ({ navigation }) => {
  const places = useResources("places");
  const categories = navigation.getParam("categoryId");
  const locations = navigation.getParam("locationId");
  const displayedPlaces = places.filter(
    (arr) => arr.category === categories && arr.location === locations
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
              placeImage: itemData.item.image,
              placeContent: itemData.item.content,
              placeInfo: itemData.item.info,
              placeLink: itemData.item.link,
              placeLat: itemData.item.lat,
              placeLng: itemData.item.lng,
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
      keyExtractor={(item, index) => item._id}
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
