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
  const OnSignInFacebook = () => null;
  const OnSignUp = () => navigation.navigate('SignUp');
  const OnForgotPassword = () => navigation.navigate('ForgotPassword');

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
            <TextButton onPress={OnForgotPassword}>
              Forgot your password?
            </TextButton>
          </View>
        </View>
        <View>
          <Button onPress={OnSignIn} mb={2}>SIGN IN</Button>
          <Button onPress={OnSignInFacebook} mb={4} icon="facebook">
            SIGN IN USING FACEBOOK
          </Button>
          <TextButton onPress={OnSignUp}>Don't have any account? Sign Up</TextButton>
        </View>
      </ScreenRootView>
    </Screen>
  );
};
