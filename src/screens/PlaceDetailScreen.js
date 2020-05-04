import React from 'react';
import {
  ScrollView,
  Image,
  Text,
  StyleSheet,
  View,
  Platform,
  Linking,
  Button,
} from 'react-native';
import MapView from 'react-native-maps';
import { MarkdownView } from 'react-native-markdown-view';
import useResources from '../components/useResources';

// Before your getPlaces effect resolves, places will be an empty array, so place = places.find(...) will return undefined.

// The issue is with the place, before getPlaces complete, the places is an empty array and .find method returns undefined. Accessing an image prop on place undefined throws an error. Perform null check before accessing the image prop on place.

const PlaceDetailScreen = ({ navigation }) => {
  const places = useResources('places');
  const selectedPlace = navigation.getParam('placeId');
  const place = places.find((item) => item._id === selectedPlace);
  const bookingUrl = `${place && place.link}`;
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const label = 'Custom Label';
  const latLng = `${place && place.lat},${
    place && place.lng
  }`;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  return (
    <ScrollView>
      {place && (
        <>
          <Image source={{ uri: place.image }} style={styles.image} />

          <View>
            {!!place.link && (
              <View style={styles.buttonTop}>
                <Button
                  title="REZERVASYON"
                  color="#2a1a73"
                  onPress={() => Linking.openURL(bookingUrl)}
                />
              </View>
            )}
          </View>

          <View style={styles.container}>
            <MarkdownView styles={markdownStyles}>
              {place.content}
            </MarkdownView>
          </View>

          <View>
            {!!place.info && (
              <>
                <Text style={styles.heading3}>Bilgiler</Text>
                <View style={styles.line} />
                <Text style={styles.container}>{place.info}</Text>
              </>
            )}
          </View>

          <View>
            {!!place.link && (
              <View style={styles.buttonBottom}>
                <Button
                  title="REZERVASYON"
                  color="#2a1a73"
                  onPress={() => Linking.openURL(bookingUrl)}
                />
              </View>
            )}
          </View>

          <View>
            {!!place.lat && !!place.lng && (
              <>
                <Text style={styles.heading3}>Harita</Text>
                <View style={styles.line} />
                <MapView
                  showsUserLocation
                  style={styles.map}
                  initialRegion={{
                    latitude: place.lat,
                    longitude: place.lng,
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.0121,
                  }}
                >
                  <MapView.Marker
                    coordinate={{
                      latitude: place.lat,
                      longitude: place.lng,
                    }}
                    title={place.title}
                    onPress={() => Linking.openURL(url)}
                  />
                </MapView>
              </>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = (navData) => {
  const place = navData.navigation.getParam('placeTitle');

  return {
    headerTitle: place,
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  container: {
    padding: 15,
    fontSize: 19,
    lineHeight: 25,
    fontFamily: 'nunito-light',
  },
  heading3: {
    fontSize: 20,
    fontFamily: 'nunito-bold',
    fontWeight: '700',
    paddingLeft: 15,
    marginBottom: 10,
  },
  line: {
    backgroundColor: '#ccc',
    height: 1,
    marginLeft: '4%',
    marginRight: '4%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2a1a73',
    padding: 6,
    borderRadius: 3,
    marginLeft: '30%',
    marginRight: '30%',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 1,
  },
  buttonTop: {
    marginLeft: '30%',
    marginRight: '30%',
    marginTop: 20,
  },
  buttonBottom: {
    marginLeft: '30%',
    marginRight: '30%',
    marginBottom: 20,
  },
  map: {
    height: 300,
    margin: 15,
  },
});

const markdownStyles = {
  text: {
    fontSize: 19,
    lineHeight: 25,
    fontFamily: 'nunito-light',
  },
  heading2: {
    fontSize: 24,
    fontFamily: 'nunito-bold',
    marginBottom: 10,
  },
  heading3: {
    fontSize: 20,
    fontFamily: 'nunito-bold',
    marginBottom: 10,
    textTransform: 'lowercase',
    textTransform: 'capitalize',
  },
  heading4: {
    fontSize: 18,
    fontFamily: 'nunito-bold',
    marginBottom: 10,
    textTransform: 'lowercase',
    textTransform: 'capitalize',
  },
  imageWrapper: {
    padding: 4,
    width: '100%',
  },
  hr: {
    marginBottom: 10,
  },
};

export default PlaceDetailScreen;
