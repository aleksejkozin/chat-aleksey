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

export const ForgotPasswordScreen = ({navigation}: any): React.ReactElement => {
  const theme = useTheme();
  const {setBusy} = useContext<any>(AppContext);
  const [state, setState, mergeState] = useStateWithMerge({
    email: '',
    emailWasSent: false,
  });

  const onResetPassword = () => {
    setBusy(true);
    auth()
      .sendPasswordResetEmail(state.email)
      .then(() => setState({emailWasSent: true}))
      .catch(showError(theme))
      .finally(() => {
        setBusy(false);
      });
  };

  const onSignIn = () => navigation.navigate('Login');

  if (state.emailWasSent) {
    return (
      <Screen image={require('../assets/images/view-of-mountain.jpg')}>
        <ScreenRootView>
          <View>
            <TextHeader
              title="Email was sent"
              sub="Please check your email and confim the password reset"
              mb={4}
            />
            <TextButton onPress={onSignIn}>Back to Sign In</TextButton>
          </View>
        </ScreenRootView>
      </Screen>
    );
  }

  return (
    <Screen image={require('../assets/images/view-of-mountain.jpg')}>
      <ScreenRootView>
        <View>
          <TextHeader
            title="Forgot Password"
            sub="Please enter your email address"
            mb={4}
          />
          <FullScreenInput
            value={state.email}
            onChangeText={(x: any) => mergeState({email: x})}
            autoCapitalize="none"
            placeholder="Email"
            icon="email-outline"
            mb={2}
          />
        </View>
        <View>
          <Button onPress={onResetPassword} mb={4}>
            RESET PASSWORD
          </Button>
          <TextButton onPress={onSignIn}>
            Remember your credentials? Sign In
          </TextButton>
        </View>
      </ScreenRootView>
    </Screen>
  );
};
