import React, {useContext} from 'react';

import {
  TextHeader,
  FullScreenInput,
  View,
  Screen,
  ScreenRootView,
  showError,
  Text,
  Setting,
} from '../components/ui';

import {useTheme, Toggle} from '@ui-kitten/components';
import {AppContext, AppRoot} from '../components/app';
import {useStateWithMerge} from '../common';
import auth from '@react-native-firebase/auth';
import {Image} from 'react-native';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

import AppIntroSlider from 'react-native-app-intro-slider';

export const OnboardingScreen = ({navigation}: any): React.ReactElement => {
  const {setOnboardingFinished, notifications, setNotifications} = useContext<
    any
  >(AppContext);

  const onNotifications = () => setNotifications((x: boolean) => !x);

  const slides = [
    // {
    //   key: 'one',
    //   title: 'Title 1',
    //   text: 'Description.\nSay something cool',
    //   image: require('../assets/images/circle.png'),
    //   bg: '#59b2ab',
    // },
    // {
    //   key: 'two',
    //   title: 'Title 2',
    //   text: 'Other cool stuff',
    //   image: require('../assets/images/square.png'),
    //   bg: '#febe29',
    // },
    {
      key: 'notifications',
      title: 'Enable Notifications',
      image: require('../assets/images/notifications.png'),
      bg: '#22bcb5',
    },
  ];

  const styles = useStyleSheet(themedStyles);

  const Item = ({item}: any) => {
    if (item.key === 'notifications') {
      return (
        <View
          style={[
            styles.slide,
            {
              backgroundColor: item.bg,
            },
          ]}>
          <View style={{flex: 0.5}} mb={4}>
            <Image style={{flex: 1}} resizeMode="contain" source={item.image} />
          </View>
          <Text mb={1} category="h2" style={styles.title}>
            {item.title}
          </Text>
          <Setting title="Notifications" onPress={onNotifications}>
            <Toggle checked={notifications} onChange={onNotifications} />
          </Setting>
        </View>
      );
    }
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}>
        <Text mb={4} category="h2" style={styles.title}>
          {item.title}
        </Text>
        <View mb={4}>
          <Image source={item.image} />
        </View>
        <Text category="s1" style={styles.text}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      showSkipButton={true}
      renderItem={Item}
      data={slides}
      onDone={() => setOnboardingFinished(true)}
    />
  );
};

const themedStyles = StyleService.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
  title: {
    textAlign: 'center',
    color: 'white',
  },
});
