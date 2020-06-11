import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View as NativeView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import {Text, TopNavigation} from '@ui-kitten/components';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  TextHeader,
  Input,
  TextButton,
  View,
  SquareButton,
  PADDINGS,
  Screen,
  Layout,
  TitleText,
  ChatMessage,
} from '../components/ui';

export const ChatScreen = (props: any): React.ReactElement => {
  const messages = [
    {
      text: 'Awesome!',
      mine: false,
    },
    {
      text: 'Sure!\nI can start right away!',
      mine: true,
    },
    {
      text: 'Hello, Aleksey,\nCould you make a cool app?',
      mine: false,
    },
  ];
  return (
    <Screen
      bottomEdge
      style={{justifyContent: 'flex-end'}}
      image={require('../assets/images/chat-bg.jpg')}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <View style={{flex: 1}} pl={1} pr={1}>
          <FlatList
            data={messages}
            inverted={true}
            renderItem={({item: props}) => <ChatMessage {...props} />}
            keyExtractor={(x) => x.text}
          />
        </View>
        <Layout p={1} style={{flexDirection: 'row'}}>
          <Input style={{flex: 1}} placeholder="Message..." />
          <SquareButton icon="paper-plane" ml={1} />
        </Layout>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-end',
  },
});
