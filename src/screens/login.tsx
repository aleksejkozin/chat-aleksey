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

export const LoginScreen = (props: any): React.ReactElement => {
  return (
    <Screen image={require('../assets/images/leaves.jpg')}>
      <ScreenRootView>
        <View>
          <TextHeader title="Hello" sub="Sign in to your account" mb={4} />
          <FullScreenInput placeholder="Email" icon="email-outline" mb={2} />
          <FullScreenInput
            placeholder="Password"
            icon="eye-off"
            secureTextEntry={true}
          />
          <View style={{alignItems: 'flex-end'}}>
            <TextButton>Forgot your password?</TextButton>
          </View>
        </View>
        <View>
          <Button mb={2}>SIGN IN</Button>
          <Button mb={4} icon="facebook">
            SIGN IN USING FACEBOOK
          </Button>
          <TextButton>Don't have any account? Sign Up</TextButton>
        </View>
      </ScreenRootView>
    </Screen>
  );
};
