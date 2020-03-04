import React from 'react'
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'

import HomeScreen from '../screens/HomeScreen'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryPlacesScreen from '../screens/CategoryPlacesScreen'
import PlaceDetailScreen from '../screens/PlaceDetailScreen'
import SearchScreen from '../screens/SearchScreen'
import SearchResultScreen from '../screens/SearchResultScreen'
import InfoScreen from '../screens/InfoScreen'
// import FavoritesScreen from '../screens/FavoritesScreen'

// Default stack options
const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    height: 50
  },
  headerForceInset: { top: 'never', bottom: 'never' },
  headerTitleStyle: {
    fontFamily: 'nunito-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'nunito-light'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'A Screen'
}

// Main navigator
const PlacesNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Categories: {
      screen: CategoriesScreen
    },
    CategoryPlaces: {
      screen: CategoryPlacesScreen
    },
    PlaceDetail: {
      screen: PlaceDetailScreen
    },
    Search: {
      screen: SearchScreen
    },
    SearchResult: {
      screen: SearchResultScreen
    },
    Info: {
      screen: InfoScreen
    }
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
)

// Search navigator
const SearchNavigator = createStackNavigator(
  {
    Search: SearchScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
)

// Info navigator
const InfoNavigator = createStackNavigator(
  {
    Info: InfoScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
)

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
      tabBarIcon: tabInfo => {
        return <Ionicons name='ios-home' size={25} color={tabInfo.tintColor} />
      },
      tabBarColor: Colors.primaryColor
    }
  },
  Search: {
    screen: SearchNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name='ios-search' size={25} color={tabInfo.tintColor} />
        )
      },
      tabBarColor: Colors.primaryColor
    }
  },
  Info: {
    screen: InfoNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons
            name='ios-information-circle-outline'
            size={25}
            color={tabInfo.tintColor}
          />
        )
      },
      tabBarColor: Colors.primaryColor
    }
  }
  // Favorites: {
  //   screen: FavNavigator,
  //   navigationOptions: {
  //     tabBarIcon: tabInfo => {
  //       return (
  //         <Ionicons name='ios-bookmark' size={25} color={tabInfo.tintColor} />
  //       )
  //     },
  //     tabBarColor: Colors.primaryColor
  //   }
  // }
}

// Tab navigator options
const PlacesFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
      activeTintColor: 'white',
      shifting: true,
      labeled: false,
      barStyle: {
        backgroundColor: Colors.primaryColor
      }
    })
    : createBottomTabNavigator(tabScreenConfig, {
      tabBarOptions: {
        activeTintColor: Colors.accentColor
      }
    })

export default createAppContainer(PlacesFavTabNavigator)
