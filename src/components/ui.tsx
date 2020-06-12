import React from 'react';
import {
  Button as KittenButton,
  Input as KittenInput,
  Text as KittenText,
  CheckBox as KittenCheckBox,
  Layout as KittenLayout,
  List,
} from '@ui-kitten/components';
import {
  Icon,
  withStyles,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {
  View as NativeView,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import ChatBubbleTail from './chat-bubble-tail';
import {Text} from 'react-native-svg';
import {SvgXml} from 'react-native-svg';

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

const UIIcon = (name: string, color = '') => (style: any): any =>
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
    return (
      <KittenButton
        {...props}
        status="basic"
        style={[
          style,
          styles.squareButton,
          {width: applySpace(size), height: applySpace(size)},
        ]}
        accessoryLeft={UIIcon(icon, styles.squareButton.color)}>
        {children}
      </KittenButton>
    );
  },
);

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

export const ChatMessage = ({text, mine}: {text?: string; mine?: boolean}) => {
  const styles = useStyleSheet(themedStyles);
  const bubbleColor = mine
    ? styles.mineChatBubbleColor
    : styles.chatBubbleColor;
  return (
    <View
      level="2"
      mb={1}
      style={[
        styles.chatMessage,
        {
          justifyContent: 'flex-end',
          flexDirection: mine ? 'row' : 'row-reverse',
        },
      ]}>
      <Layout p={1} style={[styles.chatBubble, bubbleColor]}>
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
  ({title, sub, ...props}: {title: string; sub: string}) => (
    <View {...props}>
      <View style={{alignItems: 'center'}}>
        <TitleText mb={2}>{title}</TitleText>
        <SubtitleText>{sub}</SubtitleText>
      </View>
    </View>
  ),
);

export const ScreenRootView = (props: any) => (
  <View p={1} style={{flex: 1, justifyContent: 'space-between'}} {...props} />
);

export const Screen = ({
  children,
  image,
  style,
  fullscreen = true,
  overlay = 'rgba(0, 0, 0, 0.45)',
  bottomEdge = false,
  ...props
}: {
  children?: any;
  image?: any;
  style?: object;
  fullscreen?: boolean;
  overlay?: string;
  bottomEdge?: boolean;
}) => {
  if (fullscreen) {
    return (
      <ImageBackground source={image} style={{flex: 1}}>
        <NativeView
          style={[StyleSheet.absoluteFill, {backgroundColor: overlay}]}
        />
        <SafeAreaView style={{flex: 1, ...style}}>{children}</SafeAreaView>
      </ImageBackground>
    );
  } else {
    return (
      <SafeAreaView style={{flex: 1, ...style}}>
        <ImageBackground source={image} style={{flex: 1}}>
          <NativeView
            style={[StyleSheet.absoluteFill, {backgroundColor: overlay}]}
          />
          {children}
        </ImageBackground>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  talkBubble: {
    backgroundColor: 'transparent',
    marginLeft: 100,
  },
  talkBubbleSquare: {
    width: 120,
    height: 80,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  talkBubbleTriangle: {
    position: 'absolute',
    left: -16,
    top: 26,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 13,
    borderRightWidth: 26,
    borderRightColor: 'red',
    borderBottomWidth: 13,
    borderBottomColor: 'transparent',
  },
});

const themedStyles = StyleService.create({
  chatMessage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatBubble: {
    minWidth: '60%',
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
    color: 'color-primary-600',
  },
});
