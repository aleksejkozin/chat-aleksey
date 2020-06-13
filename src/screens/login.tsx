import React, {useState, version, useContext} from 'react';

import {
  TextHeader,
  FullScreenInput,
  TextButton,
  View,
  Button,
  Screen,
  ScreenRootView,
  showError,
  setBusy,
} from '../components/ui';

import auth from '@react-native-firebase/auth';

export const LoginScreen = ({navigation}: any): React.ReactElement => {
  const [state, setState] = useState({email: '', password: ''});

  const mergeState = (x: object) => setState((old) => ({...old, ...x}));

  const OnSignIn = () => {
    setBusy(true);
    auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then(() => {})
      .catch(showError)
      .finally(() => {
        setBusy(false);
      });
  };
  const OnSignInGoogle = () => null;
  const OnSignUp = () => navigation.navigate('SignUp');
  const OnForgotPassword = () => navigation.navigate('ForgotPassword');

  return (
    <Screen lightStatusBar image={require('../assets/images/leaves.jpg')}>
      <ScreenRootView>
        <View>
          <TextHeader title="Hello" sub="Sign in to your account" mb={4} />
          <FullScreenInput
            value={state.email}
            onChangeText={(x: any) => mergeState({email: x})}
            placeholder="Email"
            icon="email-outline"
            mb={2}
          />
          <FullScreenInput
            value={state.password}
            onChangeText={(x: any) => mergeState({password: x})}
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
