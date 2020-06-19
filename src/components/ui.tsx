import React, {useContext} from 'react';
import {
  Button as KittenButton,
  Input as KittenInput,
  Text as KittenText,
  CheckBox as KittenCheckBox,
  Layout as KittenLayout,
  Icon,
  StyleService,
  Divider,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {
  View as NativeView,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ChatBubbleTail from './chat-bubble-tail';
import moment from 'moment';
import Snackbar from 'react-native-snackbar';
import {AppContext} from '../components/app';

var md5 = require('md5');

const SPACING = 16;
const applySpace = (x?: number): number | undefined => (x ? x * SPACING : x);

const spacingWrapper = (Comp: any) => ({
  ml,
  mr,
  mt,
  mb,
  m,
  pl,
  pr,
  pt,
  pb,
  p,
  style,
  ...props
}: any) => (
  <Comp
    {...props}
    style={[
      {
        marginBottom: applySpace(mb),
        marginLeft: applySpace(ml),
        marginRight: applySpace(mr),
        marginTop: applySpace(mt),
        margin: applySpace(m),
        paddingLeft: applySpace(pl),
        paddingRight: applySpace(pr),
        paddingTop: applySpace(pt),
        paddingBottom: applySpace(pb),
        padding: applySpace(p),
      },
      style,
    ]}
  />
);

export const UIIcon = (name: string, color = '') => (style: any): any =>
  name ? (
    <Icon {...(color ? {fill: color} : {})} {...style} name={name} />
  ) : null;

export const Checkbox = spacingWrapper(
  ({children, ...props}: {children: any}) => (
    <KittenCheckBox status="control" {...props}>
      {children}
    </KittenCheckBox>
  ),
);

export const Button = spacingWrapper(
  ({icon, children, ...props}: {icon: string; children: any}) => (
    <KittenButton {...props} accessoryLeft={UIIcon(icon)}>
      {children}
    </KittenButton>
  ),
);

export const SquareButton = spacingWrapper(
  ({
    icon,
    size = 1,
    style,
    children,
    ...props
  }: {
    icon: string;
    size: number;
    children: any;
    style: any;
  }) => {
    const styles = useStyleSheet(themedStyles);
    const theme = useTheme();

    return (
      <KittenButton
        {...props}
        status="basic"
        style={[
          style,
          styles.squareButton,
          {width: applySpace(size), height: applySpace(size)},
        ]}
        accessoryLeft={UIIcon(icon, theme['color-primary-600'])}>
        {children}
      </KittenButton>
    );
  },
);

export const Text = spacingWrapper(({children, ...props}: any) => (
  <KittenText {...props}>{children}</KittenText>
));

export const TextButton = spacingWrapper(({children, ...props}: any) => (
  <KittenButton {...props} status="control" appearance="ghost">
    {children}
  </KittenButton>
));

export const Input = spacingWrapper(({icon, ...props}: any) => {
  return <KittenInput accessoryRight={UIIcon(icon)} {...props} />;
});

export const FullScreenInput = (props: any) => (
  <Input status="control" {...props} />
);

export const Setting = ({title, children, onPress}: any) => (
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

const ChatMessageName = spacingWrapper(({name = 'Unknown', ...props}: any) => (
  <KittenText
    {...props}
    style={{fontWeight: 'bold', color: '#' + md5(name).substring(0, 6)}}>
    {name}
  </KittenText>
));

export const ChatMessage = ({
  text,
  name,
  mine,
  time,
}: {
  text?: string;
  name?: string;
  mine?: boolean;
  time?: any;
}) => {
  const styles = useStyleSheet(themedStyles);
  const bubbleColor = mine
    ? styles.mineChatBubbleColor
    : styles.chatBubbleColor;
  return (
    <View
      mb={1}
      style={[
        styles.chatMessage,
        {
          justifyContent: 'flex-end',
          flexDirection: mine ? 'row' : 'row-reverse',
        },
      ]}>
      <Layout p={1} style={[styles.chatBubble, bubbleColor]}>
        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
          }}>
          <KittenText style={styles.time}>
            {moment(time).format('HH:mm')}
          </KittenText>
          {!mine && <ChatMessageName name={name} />}
        </View>
        <KittenText
          style={mine ? styles.mineChatTextColor : styles.chatTextColor}>
          {text}
        </KittenText>
      </Layout>
      <View style={{width: 12, height: 15}}>
        <ChatBubbleTail mirror={!mine} color={bubbleColor.backgroundColor} />
      </View>
    </View>
  );
};

export const TitleText = spacingWrapper((props: any) => (
  <KittenText {...props} category="h2" appearance="alternative" />
));

export const SubtitleText = spacingWrapper((props: any) => (
  <KittenText {...props} category="s2" appearance="alternative" />
));

export const View = spacingWrapper((props: any) => <NativeView {...props} />);

export const Layout = spacingWrapper((props: any) => (
  <KittenLayout {...props} />
));

export const TextHeader = spacingWrapper(
  ({title, sub, ...props}: {title: string; sub: string}) => {
    const styles = useStyleSheet(themedStyles);
    return (
      <View {...props}>
        <View style={{alignItems: 'center'}}>
          <TitleText style={styles.textHeaderColor} mb={2}>
            {title}
          </TitleText>
          <SubtitleText style={styles.textHeaderColor}>{sub}</SubtitleText>
        </View>
      </View>
    );
  },
);

export const showError = (theme: any) => (error: any): void => {
  Snackbar.show({
    text: error.toString(),
    textColor: theme['text-danger-color'],
    backgroundColor: theme['border-danger-color-5'],
    duration: Snackbar.LENGTH_SHORT,
  });
};

export const HeaderIconButton = ({name, color, ...props}: any) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.headerIconView} mr={1} ml={1}>
      <KittenButton
        {...props}
        status="basic"
        appearance="ghost"
        style={{width: applySpace(1), height: applySpace(1)}}
        accessoryLeft={UIIcon(name, color)}
      />
    </View>
  );
};

export const ScreenRootView = (props: any) => (
  <View p={1} style={{flex: 1, justifyContent: 'space-between'}} {...props} />
);

export const Screen = ({
  children,
  image,
  style,
  fullscreen = true,
  lightStatusBar = false,
  overlay = 'rgba(0, 0, 0, 0.50)',
}: {
  children?: any;
  image?: any;
  style?: object;
  fullscreen?: boolean;
  lightStatusBar?: boolean;
  overlay?: string;
}) => {
  const {dark} = useContext<any>(AppContext);

  const statusBar =
    lightStatusBar || dark ? (
      <StatusBar barStyle="light-content" />
    ) : (
      <StatusBar barStyle="dark-content" />
    );

  if (fullscreen) {
    return (
      <ImageBackground source={image} width={10} height={10} style={{flex: 1}}>
        <NativeView
          style={[StyleSheet.absoluteFill, {backgroundColor: overlay}]}
        />
        <SafeAreaView style={{flex: 1, ...style}}>
          {statusBar}
          {children}
        </SafeAreaView>
      </ImageBackground>
    );
  } else {
    return (
      <SafeAreaView
        edges={['bottom', 'left', 'right']}
        style={{flex: 1, ...style}}>
        <ImageBackground source={image} style={{flex: 1}}>
          <NativeView
            style={[StyleSheet.absoluteFill, {backgroundColor: overlay}]}
          />
          {statusBar}
          {children}
        </ImageBackground>
      </SafeAreaView>
    );
  }
};

const themedStyles = StyleService.create({
  headerIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  chatMessage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatBubble: {
    minWidth: '60%',
    maxWidth: '90%',
    borderRadius: 8,
  },
  chatBubbleColor: {
    backgroundColor: 'background-basic-color-1',
  },
  mineChatBubbleColor: {
    backgroundColor: 'color-primary-600',
  },
  chatTextColor: {
    color: 'text-basic-color',
  },
  mineChatTextColor: {
    color: 'color-primary-100',
  },
  squareButton: {
    backgroundColor: 'background-basic-color-2',
    borderColor: 'background-basic-color-4',
  },
  time: {
    color: 'text-hint-color',
    fontSize: 12,
  },
  textHeaderColor: {
    color: 'white',
  },
});
