import React from 'react';
import { View } from 'react-native';

import { AnimatedTouchableOpacity, Text } from '@app/blueprints';

import { Images } from '@src/assets';
import { AppImage } from '@src/components';
import { useAppContext } from '@src/context';

import { favoriteViewStyles } from './FavoriteView.style';
import { FavoriteViewProps } from './FavoriteView.type';

export const FavoriteView = ({ item, unFavoriteHandle }: FavoriteViewProps) => {
  const { color } = useAppContext();

  const styles = favoriteViewStyles(color);

  return (
    <>
      <View key={item.id} style={styles.itemContainer}>
        <AppImage
          source={item.profileUrlLarge}
          resizeMode="cover"
          style={styles.userImage}
        />

        <View style={styles.userDetailContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.userName}
            preset={'h5'}>
            {item.name}
          </Text>
        </View>

        <AnimatedTouchableOpacity
          containerStyle={styles.favIconContainer}
          onPress={() => unFavoriteHandle(item)}>
          <AppImage
            source={Images.STAR_FILL_IMAGE}
            resizeMode="contain"
            style={styles.favIcon}
          />
        </AnimatedTouchableOpacity>
      </View>
      <View style={styles.itemSeparator} />
    </>
  );
};
