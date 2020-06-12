import React from 'react';
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
} from '../components/ui';

export const SignUpScreen = ({navigation}: any): React.ReactElement => {
  const OnSignIn = () => navigation.navigate('Login');
  const OnRigisterFacebook = () => null;
  const OnSignUp = () => null;

  return (
    <Screen
      image={require('../assets/images/road-nea-mountains.jpg')}
      overlay="rgba(0, 0, 0, 0.2)">
      <ScreenRootView>
        <View>
          <TextHeader title="Sign Up" mb={2} />
          <FullScreenInput placeholder="Usename" icon="person" mb={2} />
          <FullScreenInput placeholder="Email" icon="email-outline" mb={2} />
          <FullScreenInput
            placeholder="Password"
            icon="eye-off"
            mb={2}
            secureTextEntry={true}
          />
          <Checkbox>I read and agree on Terms & Conditions</Checkbox>
        </View>
        <View>
          <Button onPress={OnSignUp} mb={2}>
            SIGN UP
          </Button>
          <Button onPress={OnRigisterFacebook} mb={4} icon="facebook">
            REGISTER USING FACEBOOK
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
