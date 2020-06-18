import React, {useState, useContext, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Toggle,
  Divider,
  useTheme,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

import {View, Screen, Layout, Button, Text, showError} from '../components/ui';
import auth from '@react-native-firebase/auth';
import {AppContext} from '../components/app';

import {getReadableVersion} from 'react-native-device-info';

import firestore from '@react-native-firebase/firestore';

const Setting = ({title, children, onPress}: any) => (
  <View>
    <TouchableOpacity onPress={onPress}>
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        p={1}>
        <Text category="h6">{title}</Text>
        {children}
      </Layout>
    </TouchableOpacity>
    <Divider />
  </View>
);

export const SettingsScreen = (props: any): React.ReactElement => {
  const [forceUpdate, setForceUpdate] = useState(0);

  const theme = useTheme();
  const {dark, setDark, user, notifications, setNotifications} = useContext<
    any
  >(AppContext);
  const styles = useStyleSheet(themedStyles);
  const onDarkMode = () => setDark(!dark);
  const onLogOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(showError(theme));
  };

  const onNotifications = () => {
    setNotifications((x: boolean) => !x);
  };

  return (
    <Screen
      style={styles.screen}
      fullscreen={false}
      overlay={theme['border-basic-color-5']}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <Setting title="Dark mode" onPress={onDarkMode}>
            <Toggle checked={dark} onChange={onDarkMode} />
          </Setting>
          <Setting title="Notifications" onPress={onNotifications}>
            <Toggle checked={notifications} onChange={onNotifications} />
          </Setting>
        </View>
        <View>
          <View mb={1} style={{alignItems: 'center'}}>
            <Text>Logged in as</Text>
            <Text>{user && user.email}</Text>
            <Text>Version {getReadableVersion()}</Text>
          </View>
          <Button onPress={onLogOut}>LOG OUT</Button>
        </View>
      </View>
    </Screen>
  );
};

const themedStyles = StyleService.create({
  screen: {
    backgroundColor: 'background-basic-color-1',
  },
});
