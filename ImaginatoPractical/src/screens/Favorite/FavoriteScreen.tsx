import React from 'react';
import { View } from 'react-native';

import { Text } from '@app/blueprints';

import useFavorite from './useFavorite';

const FavoriteScreen = () => {
  const { styles } = useFavorite();

  return (
    <View style={styles.container}>
      <Text preset="h1">Favorite Screen</Text>
    </View>
  );
};

export default React.memo(FavoriteScreen);
