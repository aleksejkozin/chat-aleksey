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
import {GoogleSignin} from '@react-native-community/google-signin';

async function onGoogleButtonPress() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export const LoginScreen = ({navigation}: any): React.ReactElement => {
  const theme = useTheme();
  const {setBusy} = useContext<any>(AppContext);
  const [state, _, mergeState] = useStateWithMerge({
    email: '',
    password: '',
  });

  const OnSignIn = () => {
    setBusy(true);
    auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then(() => console.log('Signed in with Email!'))
      .catch(showError(theme))
      .finally(() => {
        setBusy(false);
      });
  };
  const OnSignInGoogle = () => {
    setBusy(true);
    GoogleSignin.configure({
      webClientId:
        '553302981700-0il94gqco9bir4revf4o3ap6ko4ej4sf.apps.googleusercontent.com',
    });
    onGoogleButtonPress()
      .then(() => console.log('Signed in with Google!'))
      .catch(showError(theme))
      .finally(() => {
        setBusy(false);
      });
  };
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
            autoCapitalize="none"
            icon="email-outline"
            mb={2}
          />
          <FullScreenInput
            value={state.password}
            onChangeText={(x: any) => mergeState({password: x})}
            placeholder="Password"
            autoCapitalize="none"
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
