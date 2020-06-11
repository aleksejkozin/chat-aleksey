import React from 'react';

import {
  TextHeader,
  FullScreenInput,
  TextButton,
  View,
  Button,
  FullScreen,
} from '../components/ui';

export const ForgotPasswordScreen = (props: any): React.ReactElement => {
  return (
    <FullScreen image={require('../assets/images/view-of-mountain.jpg')}>
      <View>
        <TextHeader
          title="Forgot Password"
          sub="Please enter your email address"
          mb={4}
        />
        <FullScreenInput placeholder="Email" icon="email-outline" mb={2} />
      </View>
      <Button>RESET PASSWORD</Button>
    </FullScreen>
  );
};
