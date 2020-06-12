import React, {useState} from 'react';
import {AppearanceProvider} from 'react-native-appearance';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApplicationProvider, IconRegistry, Text} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as eva from '@eva-design/eva';

import {LoginScreen} from '../screens/login';
import {SignUpScreen} from '../screens/signup';
import {ForgotPasswordScreen} from '../screens/forgot-password';
import {ChatScreen} from '../screens/chat';

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};

const Stack = createStackNavigator();

export const AuthorizedNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Chat" component={ChatScreen} />
  </Stack.Navigator>
);

export const UnauthorizedNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

const App = (): React.ReactElement => {
  const [authorized, setAuthorized] = useState(false);

  return (
    <React.Fragment>
      <IconRegistry icons={[EvaIconsPack]} />
      <AppearanceProvider>
        <ApplicationProvider {...eva} theme={eva.light}>
          <SafeAreaProvider>
            <NavigationContainer theme={navigatorTheme}>
              {authorized ? <AuthorizedNavigator /> : <UnauthorizedNavigator />}
            </NavigationContainer>
          </SafeAreaProvider>
        </ApplicationProvider>
      </AppearanceProvider>
    </React.Fragment>
  );
};

export default App;
