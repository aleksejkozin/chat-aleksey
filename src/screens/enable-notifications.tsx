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
import {AppContext} from '../components/app';
import {useStateWithMerge} from '../common';
import auth from '@react-native-firebase/auth';

export const EnableNotifications = ({navigation}: any): React.ReactElement => {
  return (
    <Screen image={require('../assets/images/view-of-mountain.jpg')}>
      <ScreenRootView>
        <View>
          <TextHeader
            title="Notifications"
            sub="Please enable notifications"
            mb={4}
          />
        </View>
      </ScreenRootView>
    </Screen>
  );
};
