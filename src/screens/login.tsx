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

export const LoginScreen = ({navigation}: any): React.ReactElement => {
  const OnSignIn = () => null;
  const OnSignInGoogle = () => null;
  const OnSignUp = () => navigation.navigate('SignUp');
  const OnForgotPassword = () => navigation.navigate('ForgotPassword');

  return (
    <Screen lightStatusBar image={require('../assets/images/leaves.jpg')}>
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
            <TextButton onPress={OnForgotPassword}>
              Forgot your password?
            </TextButton>
          </View>
        </View>
        <View>
          <Button onPress={OnSignIn} mb={2}>
            SIGN IN
          </Button>
          <Button onPress={OnSignInGoogle} mb={4} icon="google">
            SIGN IN USING GOOGLE
          </Button>
          <TextButton onPress={OnSignUp}>
            Don't have any account? Sign Up
          </TextButton>
        </View>
      </ScreenRootView>
    </Screen>
  );
};
