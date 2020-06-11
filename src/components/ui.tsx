import React from 'react';
import {
  Button as KittenButton,
  Input as KittenInput,
  Text as KittenText,
  CheckBox as KittenCheckBox,
  Layout as KittenLayout,
} from '@ui-kitten/components';
import {Icon} from '@ui-kitten/components';
import {
  View as NativeView,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

const SPACING = 16;
const applySpace = (x?: number): number => (x ? x * SPACING : x);

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
    style={{
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
      ...style,
    }}
    {...props}
  />
);

const UIIcon = (name: string) => (style: any): any =>
  name ? <Icon {...style} name={name} /> : null;

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
  }) => (
    <KittenButton
      {...props}
      status="basic"
      style={{
        ...style,
        width: applySpace(size),
        height: applySpace(size),
      }}
      accessoryLeft={UIIcon(icon)}>
      {children}
    </KittenButton>
  ),
);

export const TextButton = spacingWrapper(({children, ...props}: any) => (
  <KittenButton {...props} status="control" appearance="ghost">
    {children}
  </KittenButton>
));

export const Input = spacingWrapper(({icon, ...props}: any) => (
  <KittenInput accessoryRight={UIIcon(icon)} {...props} />
));

export const FullScreenInput = (props: any) => (
  <Input status="control" {...props} />
);

export const ChatMessage = ({text, mine}: {text?: string; mine?: boolean}) => (
  <KittenText appearance="hint" category="c2">
    {text}
  </KittenText>
);

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
  ({title, sub, style, ...props}: {title: string; sub: string; style: any}) => (
    <View style={{alignItems: 'center', ...style}} {...props}>
      <TitleText mb={2}>{title}</TitleText>
      <SubtitleText>{sub}</SubtitleText>
    </View>
  ),
);

export const PADDINGS = {
  pl: 1,
  pr: 1,
  pt: 2,
  pb: 2,
};

export const FullScreen = ({children, ...props}: any) => (
  <Screen {...props}>
    <View style={{flex: 1, justifyContent: 'space-between'}} {...PADDINGS}>
      {children}
    </View>
  </Screen>
);

export const Screen = ({
  children,
  image,
  style,
  overlay = 'rgba(0, 0, 0, 0.45)',
  bottomEdge = false,
  ...props
}: {
  children?: any;
  image?: any;
  style?: object;
  overlay?: string;
  bottomEdge?: boolean;
}) => {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground source={image} style={{flex: 1}}>
      <NativeView
        style={[StyleSheet.absoluteFill, {backgroundColor: overlay}]}
      />
      {bottomEdge && (
        <KittenLayout
          style={{
            bottom: 0,
            right: 0,
            left: 0,
            height: insets.bottom + applySpace(4),
            position: 'absolute',
          }}
        />
      )}
      <SafeAreaView style={{flex: 1, ...style}}>{children}</SafeAreaView>
    </ImageBackground>
  );
};
