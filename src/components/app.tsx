import React, {useState, useEffect, useContext} from 'react';
import {AppearanceProvider} from 'react-native-appearance';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApplicationProvider, IconRegistry, Text} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import {View} from '../components/ui';
import {AppState, Appearance} from 'react-native';

import {useTheme, Spinner} from '@ui-kitten/components';

import {HeaderIconButton} from '../components/ui';

import {LoginScreen} from '../screens/login';
import {SignUpScreen} from '../screens/signup';
import {ForgotPasswordScreen} from '../screens/forgot-password';
import {ChatScreen} from '../screens/chat';
import {SettingsScreen} from '../screens/settings';
import {SplashScreen} from '../screens/splash';
import {OnboardingScreen} from '../screens/onboarding';

import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {getUniqueId} from 'react-native-device-info';

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};

const Stack = createStackNavigator();

export enum AppRoot {
  Splash,
  Chat,
  Onboarding,
  Login,
}

const Navigator = ({root}: {root: AppRoot}) => {
  const theme = useTheme();

  if (root === AppRoot.Splash) {
    return <Stack.Screen name="Splash" component={SplashScreen} />;
  }

  const Payload = () => {
    switch (root) {
      case AppRoot.Chat:
        return (
          <>
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
          </>
        );
      case AppRoot.Login:
        return (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        );
      case AppRoot.Onboarding:
        return <Stack.Screen name="Onboarding" component={OnboardingScreen} />;
    }
  };

  return (
    <Stack.Navigator
      headerMode={root === AppRoot.Chat ? 'float' : 'none'}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme['background-basic-color-1'],
        },
        headerTintColor: theme['text-basic-color'],
      }}>
      {Payload()}
    </Stack.Navigator>
  );
};

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

const useRemoteState = (user: any, name: string, initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  const settingsRoot = (user: any) =>
    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('devices')
      .doc(getUniqueId());

  useEffect(() => {
    if (!user) {
      return;
    }
    return settingsRoot(user).onSnapshot((querySnapshot) => {
      if (querySnapshot) {
        const userData = querySnapshot.data();
        if (userData && name in userData) {
          setValue(userData[name]);
        }
      }
    });
  }, [user]);

  useEffect(() => {
    async function wrapper() {
      if (!user) {
        return;
      }
      await settingsRoot(user).set(
        {
          [name]: value,
        },
        {merge: true},
      );
    }
    wrapper();
  }, [value]);

  return [value, setValue];
};

const App = (): React.ReactElement => {
  const [root, setRoot_] = useState(AppRoot.Splash);
  const [user, setUser] = useState();
  const [busy, setBusy] = useState(false);

  const [onboardingFinished, setOnboardingFinished] = useRemoteState(
    user,
    'onboardingFinished',
    false,
  );
  const [dark, setDark] = useRemoteState(
    user,
    'dark',
    Appearance.getColorScheme() === 'dark',
  );
  const [notifications, setNotifications] = useRemoteState(
    user,
    'notifications',
    false,
  );

  const setRoot = (x: AppRoot) => {
    if (x !== root) setRoot_(x);
  };

  useEffect(() => {
    async function wrapper() {
      if (notifications) {
        const authorizationStatus = await messaging().requestPermission();
        switch (authorizationStatus) {
          case messaging.AuthorizationStatus.AUTHORIZED:
          case messaging.AuthorizationStatus.PROVISIONAL:
            await messaging().registerDeviceForRemoteMessages();
            console.log(`FCM Token: ${await messaging().getToken()}`);
            break;
          default:
            setNotifications(false);
            break;
        }
      } else {
        await messaging().unregisterDeviceForRemoteMessages();
      }
    }
    wrapper();
  }, [notifications]);

  const onAppStateChange = (newState: any) => {
    if (newState === 'active') {
      async function wrapper() {
        const authorizationStatus = await messaging().hasPermission();
        switch (authorizationStatus) {
          case messaging.AuthorizationStatus.AUTHORIZED:
          case messaging.AuthorizationStatus.PROVISIONAL:
            break;
          default:
            setNotifications(false);
            break;
        }
      }
      wrapper();
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', onAppStateChange);
    return () => AppState.removeEventListener('change', onAppStateChange);
  }, []);

  useEffect(() => {
    if (user) {
      setRoot(AppRoot.Chat);
    } else {
      setRoot(AppRoot.Login);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (onboardingFinished) {
        setRoot(AppRoot.Chat);
      } else {
        setRoot(AppRoot.Onboarding);
      }
    }
  }, [user, onboardingFinished]);

  useEffect(() => {
    return auth().onAuthStateChanged((user: any) => setUser(user));
  }, []);

  return (
    <AppContext.Provider
      value={{
        setRoot: setRoot,
        setBusy: setBusy,
        setDark: setDark,
        setNotifications: setNotifications,
        notifications: notifications,
        setOnboardingFinished: setOnboardingFinished,
        dark: dark,
        user: user,
      }}>
      <IconRegistry icons={[EvaIconsPack]} />
      <AppearanceProvider>
        <ApplicationProvider {...eva} theme={dark ? eva.dark : eva.light}>
          <SafeAreaProvider>
            <NavigationContainer theme={navigatorTheme}>
              <Navigator root={root} />
            </NavigationContainer>
          </SafeAreaProvider>
          {busy && <BusyOverlay />}
        </ApplicationProvider>
      </AppearanceProvider>
    </AppContext.Provider>
  );
};

export default App;
