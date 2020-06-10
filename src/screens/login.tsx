import React from "react"
import { StyleSheet, ImageBackground, View, ImageStyle } from "react-native"
import { Button, Input, Text } from "@ui-kitten/components"
import { Icon, IconElement } from "@ui-kitten/components"
import { SafeAreaView } from "react-native-safe-area-context"

const DEFAULT_OVERLAY_COLOR = "rgba(0, 0, 0, 0.45)"

export const UIIcon = (name: string) => (style: ImageStyle): IconElement => (
  <Icon {...style} name={name} />
)

export const LoginScreen = (props): React.ReactElement => {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/images/leaves.jpg")}
    >
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: DEFAULT_OVERLAY_COLOR },
        ]}
      />
      <SafeAreaView style={styles.root}>
        <View style={[styles.header, styles.doubleInputMargin]}>
          <Text category="h2" appearance="alternative">
            Hello
          </Text>
          <Text
            style={styles.headerSubtitle}
            category="s2"
            appearance="alternative"
          >
            Sign in to your account
          </Text>
        </View>
        <View style={styles.auth}>
          <Input
            placeholder="Email"
            status="control"
            style={styles.inputMargin}
            icon={UIIcon("email-outline")}
          />
          <Input
            secureTextEntry={true}
            placeholder="Password"
            status="control"
            icon={UIIcon("eye-off")}
          />
          <View style={styles.forgotYourPassword}>
            <Button status="control" appearance="ghost">
              Forgot your password?
            </Button>
          </View>
        </View>
        <View>
          <Button style={styles.inputMargin}>SIGN IN</Button>
          <Button style={styles.doubleInputMargin} icon={UIIcon("facebook")}>
            SIGN IN USING FACEBOOK
          </Button>
          <Button status="control" appearance="ghost">
            Don't have any account? Sign Up
          </Button>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const sizedStyleSheet = (size: number) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    header: {
      alignItems: "center",
    },
    headerSubtitle: {
      marginTop: size * 2,
    },
    auth: {},
    forgotYourPassword: {
      alignItems: "flex-end",
    },
    inputMargin: {
      marginBottom: size * 2,
    },
    doubleInputMargin: {
      marginBottom: size * 4,
    },
    container: {
      flex: 1,
      paddingVertical: 43.5,
      paddingHorizontal: 21.5,
    },
  })

const styles = sizedStyleSheet(16)
