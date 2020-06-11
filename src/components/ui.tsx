import React from 'react';
import {
  Button as KittenButton,
  Input as KittenInput,
  Text as KittenText,
  TextProps,
} from '@ui-kitten/components';
import {Icon} from '@ui-kitten/components';
import {View as NativeView, StyleSheet, ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlexStyleProps} from '@ui-kitten/components/devsupport';

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
}: any) => {
  const SPACE = 16;
  const applySpace = (x?: number) => (x ? x * SPACE : x);
  return (
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
};

const UIIcon = (name: string) => (style: any): any =>
  name ? <Icon {...style} name={name} /> : null;

export const Button = spacingWrapper(
  ({icon, children, ...props}: {icon: string; children: any}) => (
    <KittenButton {...props} accessoryLeft={UIIcon(icon)}>
      {children}
    </KittenButton>
  ),
);

export const TextButton = spacingWrapper(
  ({children, ...props}: {children: any}) => (
    <KittenButton {...props} status="control" appearance="ghost">
      {children}
    </KittenButton>
  ),
);

export const Input = spacingWrapper(
  ({
    placeholder,
    icon,
    children,
    secureTextEntry,
    ...props
  }: {
    children: any;
    icon: string;
    placeholder: string;
    secureTextEntry: boolean;
  }) => (
    <KittenInput
      placeholder={placeholder}
      status="control"
      accessoryRight={UIIcon(icon)}
      secureTextEntry={secureTextEntry}
      {...props}>
      {children}
    </KittenInput>
  ),
);

export const TitleText = spacingWrapper(
  ({children, ...props}: {children: any}) => (
    <KittenText {...props} category="h2" appearance="alternative">
      {children}
    </KittenText>
  ),
);

export const SubtitleText = spacingWrapper(
  ({children, ...props}: {children: any}) => (
    <KittenText {...props} category="s2" appearance="alternative">
      {children}
    </KittenText>
  ),
);

export const View = spacingWrapper(({children, ...props}: {children: any}) => (
  <NativeView {...props}>{children}</NativeView>
));

export const TextHeader = spacingWrapper(
  ({title, sub, style, ...props}: {title: string; sub: string; style: any}) => (
    <View style={{alignItems: 'center', ...style}} {...props}>
      <TitleText mb={2}>{title}</TitleText>
      <SubtitleText>{sub}</SubtitleText>
    </View>
  ),
);

export const Screen = ({
  children,
  image,
  style,
  overlay = 'rgba(0, 0, 0, 0.45)',
  ...props
}: {
  children?: any;
  image?: any;
  style?: object;
  overlay?: string;
}) => (
  <ImageBackground source={image} style={{flex: 1}}>
    <NativeView style={[StyleSheet.absoluteFill, {backgroundColor: overlay}]} />
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{flex: 1, justifyContent: 'space-between', ...style}}
        pl={1}
        pr={1}
        pt={2}
        pb={2}
        {...props}>
        {children}
      </View>
    </SafeAreaView>
  </ImageBackground>
);
