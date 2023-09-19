import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { useAppContext } from '@src/context';
import { Palette } from '@src/utils';

export type BaseLayoutProps = React.PropsWithChildren & {
  style?: StyleProp<ViewStyle>;
};

export const BaseLayout = React.memo(({ children, style }: BaseLayoutProps) => {
  const { color } = useAppContext();
  const styles = baseLayoutStyles(color);

  return (
    <SafeAreaView style={[styles.safeAreaStyle, style]}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={color.backgroundColor}
      />
      {children}
    </SafeAreaView>
  );
});

export const baseLayoutStyles = ({ white }: Palette) =>
  StyleSheet.create({
    safeAreaStyle: {
      backgroundColor: white,
      flex: 1,
    },
  });
