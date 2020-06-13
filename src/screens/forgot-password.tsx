import React from 'react';

import {
  TextHeader,
  FullScreenInput,
  TextButton,
  View,
  Button,
  Screen,
  ScreenRootView,
} from '../components/ui';

export const ForgotPasswordScreen = ({navigation}: any): React.ReactElement => {
  const OnSignIn = () => navigation.navigate('Login');

  return (
    <Screen image={require('../assets/images/view-of-mountain.jpg')}>
      <ScreenRootView>
        <View>
          <TextHeader
            title="Forgot Password"
            sub="Please enter your email address"
            mb={4}
          />
          <FullScreenInput placeholder="Email" icon="email-outline" mb={2} />
        </View>
        <View>
          <Button mb={4}>RESET PASSWORD</Button>
          <TextButton onPress={OnSignIn}>
            Remember your credentials? Sign In
          </TextButton>
        </View>
      </ScreenRootView>
    </Screen>
  );
};
