import React from 'react';
import { StyleSheet, View } from 'react-native';

import Lottie from 'lottie-react-native';

import { contents } from '@src/context';
import { scaleHeight, scaleWidth } from '@src/utils';

import { Text } from '../Text/Text';

export const EmptyFooterView = React.memo(() => {
  const styles = emptyFooterViewStyle();
  return (
    <View style={styles.mainContainer}>
      <Lottie
        source={require('../../src/assets/lotties/hand_loading.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text preset="h2">{contents('common.noDataFound')}</Text>
    </View>
  );
});

export const emptyFooterViewStyle = () => {
  const styles = StyleSheet.create({
    lottie: {
      height: scaleHeight(200),
      width: scaleWidth(200),
    },
    mainContainer: {
      alignItems: 'center',
    },
  });

  return styles;
};
