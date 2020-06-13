import React from 'react';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

import {
  Input,
  View,
  SquareButton,
  Screen,
  Layout,
  ChatMessage,
} from '../components/ui';

export const SettingsScreen = (props: any): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  return (
    <Screen
      fullscreen={false}
      image={require('../assets/images/chat-bg.jpg')}></Screen>
  );
};

const themedStyles = StyleService.create({});
