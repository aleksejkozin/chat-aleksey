import React from 'react';
import {useTheme, StyleService, useStyleSheet} from '@ui-kitten/components';

import {View, Screen} from '../components/ui';

export const SplashScreen = (props: any): React.ReactElement => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  return (
    <Screen
      style={styles.screen}
      fullscreen={true}
      overlay={theme['border-basic-color-5']}>
      <View style={{flex: 1, justifyContent: 'space-between'}}></View>
    </Screen>
  );
};

const themedStyles = StyleService.create({
  screen: {
    backgroundColor: 'background-basic-color-1',
  },
});
