import React, {useState} from 'react';
import {AppearanceProvider} from 'react-native-appearance';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApplicationProvider, IconRegistry, Text} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import {View} from '../components/ui';

import {useTheme, Spinner} from '@ui-kitten/components';

import {HeaderIconButton} from '../components/ui';

import {LoginScreen} from '../screens/login';
import {SignUpScreen} from '../screens/signup';
import {ForgotPasswordScreen} from '../screens/forgot-password';
import {ChatScreen} from '../screens/chat';
import {SettingsScreen} from '../screens/settings';

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};

const Stack = createStackNavigator();

export const AuthorizedNavigator = (): React.ReactElement => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      headerMode="float"
      screenOptions={{
        headerTintColor: theme['text-basic-color'],
      }}>
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({navigation}: any) => ({
          headerRight: ({tintColor}: any) => (
            <HeaderIconButton
              name="settings-2-outline"
              color={tintColor}
              onPress={() => navigation.navigate('Settings')}
            />
          ),
        })}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export const UnauthorizedNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

const BusyOverlay = () => (
  <View
    style={{
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.7)',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Spinner size="giant" />
  </View>
);

export const AppContext = React.createContext({});

const App = (): React.ReactElement => {
  const [busy, setBusy] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  return (
    <AppContext.Provider value={{setBusy: setBusy}}>
      <IconRegistry icons={[EvaIconsPack]} />
      <AppearanceProvider>
        <ApplicationProvider {...eva} theme={eva.light}>
          <SafeAreaProvider>
            <NavigationContainer theme={navigatorTheme}>
              {authorized ? <AuthorizedNavigator /> : <UnauthorizedNavigator />}
            </NavigationContainer>
          </SafeAreaProvider>
          {busy && <BusyOverlay />}
        </ApplicationProvider>
      </AppearanceProvider>
    </AppContext.Provider>
  );
};

export default App;
