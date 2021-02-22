import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

const CustomHeaderButton = () => (
  <HeaderButton IconComponent={Ionicons} iconSize={23} color={Platform.OS === 'android' ? 'white' : '#2a1a73'} />
);

export default CustomHeaderButton;
