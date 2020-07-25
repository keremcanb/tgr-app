import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import Navigator from './src/components/Navigator';

enableScreens();

const fetchFonts = () => Font.loadAsync({
  'nunito-bold': require('./src/assets/fonts/Nunito-Bold.ttf'),
  'nunito-light': require('./src/assets/fonts/Nunito-Light.ttf'),
});

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  return !fontLoaded ? (
    <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />
  ) : (
    <Navigator />
  );
}
