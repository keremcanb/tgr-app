import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  Image,
  Text,
  StyleSheet,
  View,
  Platform,
  Linking,
  Button,
  TouchableOpacity
} from 'react-native'
import MapView from 'react-native-maps'
import { MarkdownView } from 'react-native-markdown-view'
import axios from 'axios'

const PlaceDetailScreen = props => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    const getPlaces = async () => {
      const result = await axios.get('https://tgr-admin.appspot.com/api/places')

      setPlaces(result.data)
    }

    getPlaces()
  }, [])

  const placeID = props.navigation.getParam('placeId')

  const selectedPlace = places.find(place => place._id === placeID)

  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
  const latLng = `${selectedPlace.lat},${selectedPlace.lng}`
  const label = 'Custom Label'
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`
  })

  const bookingUrl = `${selectedPlace.link}`

  return (
    <ScrollView>
      (
      <>
        <Image source={{ uri: selectedPlace.image }} style={styles.image} />

        <View>
          {selectedPlace.link !== '' && (
            <View>
              {/* <Button
                  title='REZERVASYON'
                  color='#2a1a73'
                  onPress={() => Linking.openURL(bookingUrl)}
                /> */}
              <TouchableOpacity
                onPress={() => Linking.openURL(bookingUrl)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>REZERVASYON</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.container}>
          <MarkdownView styles={markdownStyles}>
            {selectedPlace.content}
          </MarkdownView>
        </View>

        <View>
          {selectedPlace.info !== '' && (
            <>
              <Text style={styles.heading3}>Bilgiler</Text>
              <View style={styles.line} />
              <Text style={styles.container}>{selectedPlace.info}</Text>
            </>
          )}
        </View>

        <View>
          {selectedPlace.link !== '' && (
            <View style={styles.buttonBottom}>
              <Button
                title='REZERVASYON'
                color='#2a1a73'
                onPress={() => Linking.openURL(bookingUrl)}
              />
            </View>
          )}
        </View>

        <View>
          {selectedPlace.lat && selectedPlace.lng !== '' && (
            <>
              <Text style={styles.heading3}>Harita</Text>
              <View style={styles.line} />
              <MapView
                showsUserLocation
                style={styles.map}
                initialRegion={{
                  latitude: selectedPlace.lat,
                  longitude: selectedPlace.lng,
                  latitudeDelta: 0.0022,
                  longitudeDelta: 0.0121
                }}
              >
                <MapView.Marker
                  coordinate={{
                    latitude: selectedPlace.lat,
                    longitude: selectedPlace.lng
                  }}
                  title={selectedPlace.title}
                  onPress={() => Linking.openURL(url)}
                />
              </MapView>
            </>
          )}
        </View>
      </>
      )
    </ScrollView>
  )
}

PlaceDetailScreen.navigationOptions = navData => {
  const place = navData.navigation.getParam('placeTitle')

  return {
    headerTitle: place
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  container: {
    padding: 15,
    fontSize: 19,
    lineHeight: 25,
    fontFamily: 'nunito-light'
  },
  heading3: {
    fontSize: 20,
    fontFamily: 'nunito-bold',
    fontWeight: '700',
    paddingLeft: 15,
    marginBottom: 10
  },
  line: {
    backgroundColor: '#ccc',
    height: 1,
    marginLeft: '4%',
    marginRight: '4%',
    marginBottom: 10
  },
  buttonTop: {
    marginLeft: '30%',
    marginRight: '30%',
    marginTop: 20
  },
  buttonBottom: {
    marginLeft: '30%',
    marginRight: '30%',
    marginBottom: 20
  },
  map: {
    height: 300,
    margin: 15
  },
  button: {
    backgroundColor: '#2a1a73',
    padding: 6,
    borderRadius: 3,
    marginLeft: '30%',
    marginRight: '30%',
    marginTop: 15
  },
  buttonText: {
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 1
  }
})

const markdownStyles = {
  text: {
    fontSize: 19,
    lineHeight: 25,
    fontFamily: 'nunito-light'
  },
  heading2: {
    fontSize: 24,
    fontFamily: 'nunito-bold',
    marginBottom: 10
  },
  heading3: {
    fontSize: 20,
    fontFamily: 'nunito-bold',
    textTransform: 'lowercase',
    textTransform: 'capitalize',
    marginBottom: 10
  },
  heading4: {
    fontSize: 18,
    fontFamily: 'nunito-bold',
    textTransform: 'lowercase',
    textTransform: 'capitalize',
    marginBottom: 10
  },
  imageWrapper: {
    padding: 4,
    width: '100%'
  },
  hr: {
    marginBottom: 10
  }
}

export default PlaceDetailScreen
