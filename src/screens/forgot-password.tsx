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

export const ForgotPasswordScreen = (props: any): React.ReactElement => {
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
        <Button>RESET PASSWORD</Button>
      </ScreenRootView>
    </Screen>
  );
};
