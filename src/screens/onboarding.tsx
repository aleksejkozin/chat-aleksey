import React, {useContext} from 'react';

import {
  TextHeader,
  FullScreenInput,
  View,
  Screen,
  ScreenRootView,
  showError,
  Text,
} from '../components/ui';

import {useTheme} from '@ui-kitten/components';
import {AppContext, AppRoot} from '../components/app';
import {useStateWithMerge} from '../common';
import auth from '@react-native-firebase/auth';
import {Image} from 'react-native';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

import AppIntroSlider from 'react-native-app-intro-slider';

export const OnboardingScreen = ({navigation}: any): React.ReactElement => {
  const {setOnboardingFinished} = useContext<any>(AppContext);

  const slides = [
    {
      key: 'one',
      title: 'Title 1',
      text: 'Description.\nSay something cool',
      image: require('../assets/images/circle.png'),
      bg: '#59b2ab',
    },
    {
      key: 'two',
      title: 'Title 2',
      text: 'Other cool stuff',
      image: require('../assets/images/square.png'),
      bg: '#febe29',
    },
    {
      key: 'three',
      title: 'Rocket guy',
      text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
      image: require('../assets/images/triangle.png'),
      bg: '#22bcb5',
    },
  ];

  const styles = useStyleSheet(themedStyles);

  const Item = ({item}: any) => {
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
