import React, { useState } from 'react'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { enableScreens } from 'react-native-screens'
import PlacesNavigator from './src/navigation/PlacesNavigator'

enableScreens()

const fetchFonts = () => {
  return Font.loadAsync({
    'nunito-bold': require('./src/assets/fonts/Nunito-Bold.ttf'),
    'nunito-light': require('./src/assets/fonts/Nunito-Light.ttf')
  })
}

export default function App () {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    )
  }

  return <PlacesNavigator />
}
