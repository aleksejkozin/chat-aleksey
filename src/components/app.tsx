import React, {useState, useEffect} from 'react';
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

import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};

const Stack = createStackNavigator();

const Navigator = ({authorized}: any) => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      headerMode={authorized ? 'float' : 'none'}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme['background-basic-color-1'],
        },
        headerTintColor: theme['text-basic-color'],
      }}>
      {authorized ? (
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
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
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

const App = (): React.ReactElement => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [busy, setBusy] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    async function wrapper() {
      if (!user || initializing) {
        return;
      }
      await firestore().collection('users').doc(user.uid).set({
        dark: dark,
      });
    }
    wrapper();
  }, [dark]);

  useEffect(() => {
    if (!user) {
      return;
    }
    return firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot) {
          const userData = querySnapshot.data();
          if (initializing) setInitializing(false);
          console.log(userData);
          setDark(userData.dark);
        }
      });
  }, [user]);

  function onAuthStateChanged(user: any) {
    setUser(user);
  }

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (initializing) {
    return <React.Fragment />;
  }

  return (
    <AppContext.Provider
      value={{setBusy: setBusy, setDark: setDark, dark: dark, user: user}}>
      <IconRegistry icons={[EvaIconsPack]} />
      <AppearanceProvider>
        <ApplicationProvider {...eva} theme={dark ? eva.dark : eva.light}>
          <SafeAreaProvider>
            <NavigationContainer theme={navigatorTheme}>
              <Navigator authorized={user} />
            </NavigationContainer>
          </SafeAreaProvider>
          {busy && <BusyOverlay />}
        </ApplicationProvider>
      </AppearanceProvider>
    </AppContext.Provider>
  );
};

export default App;
