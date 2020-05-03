import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryPlacesScreen from "../screens/CategoryPlacesScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import SearchScreen from "../screens/SearchScreen";
import SearchResultScreen from "../screens/SearchResultScreen";
import InfoScreen from "../screens/InfoScreen";
// import FavoritesScreen from '../screens/FavoritesScreen'

// Default stack options
const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "#2a1a73" : "",
    height: 50,
  },
  headerTitleStyle: {
    fontFamily: "nunito-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "nunito-light",
  },
  headerTintColor: Platform.OS === "android" ? "white" : "#2a1a73",
};

// Main navigator
const PlacesNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Categories: {
      screen: CategoriesScreen,
    },
    CategoryPlaces: {
      screen: CategoryPlacesScreen,
    },
    PlaceDetail: {
      screen: PlaceDetailScreen,
    },
    Search: {
      screen: SearchScreen,
    },
    SearchResult: {
      screen: SearchResultScreen,
    },
    Info: {
      screen: InfoScreen,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

// Search navigator
const SearchNavigator = createStackNavigator(
  {
    Search: SearchScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

// Info navigator
const InfoNavigator = createStackNavigator(
  {
    Info: InfoScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

// Favorites navigator
// const FavNavigator = createStackNavigator(
//   {
//     Favorites: FavoritesScreen
//   },
//   {
//     defaultNavigationOptions: defaultStackNavOptions
//   }
// )

// Bottom tab navigator
const tabScreenConfig = {
  Places: {
    screen: PlacesNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: "#2a1a73",
    },
  },
  Search: {
    screen: SearchNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-search" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: "#2a1a73",
    },
  },
  Info: {
    screen: InfoNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="ios-information-circle-outline"
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: "#2a1a73",
    },
  },
  // Favorites: {
  //   screen: FavNavigator,
  //   navigationOptions: {
  //     tabBarIcon: tabInfo => {
  //       return (
  //         <Ionicons name='ios-bookmark' size={25} color={tabInfo.tintColor} />
  //       )
  //     },
  //     tabBarColor: '#2a1a73'
  //   }
  // }
};

// Tab navigator options
const PlacesFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: "white",
        shifting: true,
        labeled: false,
        barStyle: {
          backgroundColor: "#2a1a73",
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: "#ff6f00",
        },
      });

export default createAppContainer(PlacesFavTabNavigator);
