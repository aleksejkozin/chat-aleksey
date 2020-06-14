import React, {useContext, useState, useEffect} from 'react';
import {KeyboardAvoidingView, Platform, FlatList, Keyboard} from 'react-native';
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
  showError,
} from '../components/ui';

import {useTheme} from '@ui-kitten/components';

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';

export const ChatScreen = (): React.ReactElement => {
  const theme = useTheme();
  const {setBusy, user} = useContext<any>(AppContext);
  const styles = useStyleSheet(themedStyles);
  const headerHeight = useHeaderHeight();
  const [newMessage, setNewMessage] = useState('');

  const onSendMessage = () => {
    if (newMessage.length > 0) {
      // functions().useFunctionsEmulator('http://localhost:5001');
      Keyboard.dismiss();
      setBusy(true);
      functions()
        .httpsCallable('sendMessage')({message: newMessage})
        .catch(showError(theme))
        .then(() => setNewMessage(''))
        .finally(() => setBusy(false));
    }
  };

  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    return firestore()
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(20)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot && querySnapshot.docs)
          setMessages(
            querySnapshot.docs.map((x) => ({
              ...x.data(),
              id: x.id,
            })),
          );
      });
  }, []);

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
            renderItem={({item: {message, uid, name, createdAt}}) => (
              <ChatMessage
                text={message}
                time={createdAt.toDate()}
                mine={uid === user.uid}
                name={name}
              />
            )}
            keyExtractor={(x) => x.id}
          />
        </View>
        <Layout p={1} style={styles.bottom}>
          <Input
            value={newMessage}
            multiline={true}
            onChangeText={(x: any) => setNewMessage(x)}
            style={{flex: 1}}
            placeholder="Message..."
          />
          <SquareButton onPress={onSendMessage} icon="paper-plane" ml={1} />
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
