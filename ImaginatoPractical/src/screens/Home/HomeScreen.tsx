import React from 'react';
import { View } from 'react-native';

import { Text } from '@app/blueprints';

import useHome from './useHome';

const HomeScreen = () => {
  const { styles } = useHome();

  return (
    <View style={styles.container}>
      <Text preset="h1">Home Screen</Text>
    </View>
  );
};

export default React.memo(HomeScreen);
