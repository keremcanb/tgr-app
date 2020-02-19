import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  ImageBackground
} from 'react-native'

const CategoryGridTile = props => {
  let TouchableCmp = TouchableOpacity

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback
  }

  return (
    <View style={styles.PlaceItem}>
      <TouchableCmp onPress={props.onSelect}>
        <View>
          <ImageBackground style={styles.bgImage} source={{ uri: props.image }}>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {props.title}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableCmp>
    </View>
  )
}

const styles = StyleSheet.create({
  PlaceItem: {
    flex: 1 / 2,
    height: 150,
    width: '100%',
    margin: 1
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 3,
    paddingHorizontal: 12
  },
  title: {
    fontFamily: 'nunito-light',
    fontSize: 21,
    color: '#fff',
    textAlign: 'center'
  }
})

export default CategoryGridTile
