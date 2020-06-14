import React, {useState, useContext, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {Toggle, Divider, useTheme} from '@ui-kitten/components';

import {View, Screen, Layout, Button, Text, showError} from '../components/ui';
import auth from '@react-native-firebase/auth';
import {AppContext} from '../components/app';

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
  const theme = useTheme();
  const {setBusy, setUser} = useContext<any>(AppContext);
  const [darkMode, setDarkMode] = useState(false);

  const onDarkMode = () => setDarkMode(!darkMode);
  const onLogOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(showError(theme));
  };

  return (
    <Screen fullscreen={false} overlay={theme['border-basic-color-5']}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <Setting title="Dark mode" onPress={onDarkMode}>
          <Toggle checked={darkMode} onChange={onDarkMode} />
        </Setting>
        <Button onPress={onLogOut}>LOG OUT</Button>
      </View>
    </Screen>
  );
};
