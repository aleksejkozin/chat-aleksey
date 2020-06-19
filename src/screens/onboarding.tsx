import React, {useContext} from 'react';

import {
  TextHeader,
  FullScreenInput,
  TextButton,
  View,
  Button,
  Screen,
  ScreenRootView,
  showError,
} from '../components/ui';

import {useTheme} from '@ui-kitten/components';
import {AppContext, AppRoot} from '../components/app';
import {useStateWithMerge} from '../common';
import auth from '@react-native-firebase/auth';

export const OnboardingScreen = ({navigation}: any): React.ReactElement => {
  const {setRoot, setOnboardingFinished} = useContext<any>(AppContext);

  setOnboardingFinished(true);
  // setRoot(AppRoot.Chat);

  return (
    <Screen image={require('../assets/images/view-of-mountain.jpg')}>
      <ScreenRootView></ScreenRootView>
    </Screen>
  );
};
