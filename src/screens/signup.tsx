import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';

import {
  TextHeader,
  FullScreenInput,
  TextButton,
  View,
  Button,
  Screen,
  Checkbox,
  ScreenRootView,
  showError,
} from '../components/ui';

import {useTheme} from '@ui-kitten/components';
import {AppContext} from '../components/app';
import {useStateWithMerge} from '../common';
import auth from '@react-native-firebase/auth';

export const SignUpScreen = ({navigation}: any): React.ReactElement => {
  const theme = useTheme();
  const {setBusy} = useContext<any>(AppContext);
  const [state, _, mergeState] = useStateWithMerge({
    email: '',
    password: '',
    username: '',
  });

  const OnSignIn = () => navigation.navigate('Login');
  const OnRigisterGoogle = () => null;
  const OnSignUp = () => {
    setBusy(true);
    auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .then((credentials) =>
        credentials.user
          .updateProfile({
            displayName: state.username,
          })
          .then(() => console.log('User created'))
          .catch(showError(theme)),
      )
      .catch(showError(theme))
      .finally(() => {
        setBusy(false);
      });
  };

  return (
    <Screen
      image={require('../assets/images/road-nea-mountains.jpg')}
      overlay="rgba(0, 0, 0, 0.15)">
      <ScreenRootView>
        <View>
          <TextHeader title="Sign Up" mb={2} />
          <FullScreenInput
            value={state.username}
            onChangeText={(x: any) => mergeState({username: x})}
            placeholder="Username"
            icon="person"
            mb={2}
          />
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
            mb={2}
            secureTextEntry={true}
          />
        </View>
        <View>
          <Button onPress={OnSignUp} mb={2}>
            SIGN UP
          </Button>
          <Button onPress={OnRigisterGoogle} mb={4} icon="google">
            REGISTER USING GOOGLE
          </Button>
          <TextButton onPress={OnSignIn}>
            Alreade have account? Sign In
          </TextButton>
        </View>
      </ScreenRootView>
    </Screen>
  );
};

const styles = StyleSheet.create({});
