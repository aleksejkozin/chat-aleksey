import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View as NativeView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import {
  Text,
  TopNavigation,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
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
  const styles = useStyleSheet(themedStyles);
  const messages = [
    {
      text: 'Awesome!',
      mine: true,
    },
    {
      text: 'Sure!\nI can start right away!',
      mine: false,
    },
    {
      text: 'Hello, Aleksey,\nCould you make a cool app for me?',
      mine: true,
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
