import React from "react"
import { StyleSheet } from "react-native"
import { TopNavigation } from "@ui-kitten/components"
import { SafeAreaView } from "react-native-safe-area-context"

export const SignUpScreen = (props): React.ReactElement => {
  return (
    <SafeAreaView style={styles.root}>
      <TopNavigation title="Kitten Tricks" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})
