import React, {useContext} from 'react';
import {KeyboardAvoidingView, Platform, FlatList} from 'react-native';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useHeaderHeight} from '@react-navigation/stack';
import {AppContext} from '../components/app';

import {
  Input,
  View,
  SquareButton,
  Screen,
  Layout,
  ChatMessage,
} from '../components/ui';

export const ChatScreen = (props: any): React.ReactElement => {
  const {setBusy, user} = useContext<any>(AppContext);
  const styles = useStyleSheet(themedStyles);
  const headerHeight = useHeaderHeight();
  const messages = [
    {
      text: 'Awesome!',
      name: 'JC Denton',
      mine: true,
      time: Date.now(),
    },
    {
      name: 'Aleksey Kozin',
      text: 'Sure!\nI can start right away!',
      mine: false,
      time: Date.now(),
    },
    {
      name: 'JC Denton',
      text: 'Hello, Aleksey,\nCould you make a cool app for me?',
      mine: true,
      time: Date.now(),
    },
  ];
  return (
    <Screen
      style={styles.screen}
      fullscreen={false}
      image={require('../assets/images/chat-bg.jpg')}
      overlay={styles.overlay.backgroundColor + 'DD'}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <View style={{flex: 1}} pl={1} pr={1}>
          <FlatList
            data={messages}
            inverted={true}
            showsVerticalScrollIndicator={false}
            renderItem={({item: props}) => <ChatMessage {...props} />}
            keyExtractor={(x) => x.text}
          />
        </View>
        <Layout p={1} style={styles.bottom}>
          <Input style={{flex: 1}} placeholder="Message..." />
          <SquareButton icon="paper-plane" ml={1} />
        </Layout>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const themedStyles = StyleService.create({
  overlay: {
    backgroundColor: 'border-basic-color-5',
  },
  bottom: {
    flexDirection: 'row',
    backgroundColor: 'background-basic-color-1',
  },
  screen: {
    justifyContent: 'flex-end',
    backgroundColor: 'background-basic-color-1',
  },
});
