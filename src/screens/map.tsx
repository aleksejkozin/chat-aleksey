import React, {useContext} from 'react';

import {
  TextHeader,
  FullScreenInput,
  View,
  Screen,
  ScreenRootView,
  showError,
  Text,
  Setting,
} from '../components/ui';

import {useTheme, Toggle} from '@ui-kitten/components';
import {AppContext, AppRoot} from '../components/app';
import {useStateWithMerge} from '../common';
import auth from '@react-native-firebase/auth';
import {Image} from 'react-native';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import AppIntroSlider from 'react-native-app-intro-slider';

export const MapScreen = ({navigation}: any): React.ReactElement => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{flex: 1}}
      initialRegion={{
        latitude: 32.079439,
        longitude: 72.671038,
        latitudeDelta: 0.3922,
        longitudeDelta: 0.3521,
      }}
    />
  );
};

const themedStyles = StyleService.create({});
