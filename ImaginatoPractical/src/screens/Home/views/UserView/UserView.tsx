import React from 'react';
import { View } from 'react-native';

import { AnimatedTouchableOpacity, Text } from '@app/blueprints';

import { Images } from '@src/assets';
import { AppImage } from '@src/components';
import { useAppContext } from '@src/context';
import type { Extra } from '@src/services';

import { userViewStyle } from './UserView.style';
import { UserViewProps } from './UserView.type';

export const UserView = React.memo(
  ({ handleFavorite, handleUnFavorite, isFavorite, item }: UserViewProps) => {
    const { color } = useAppContext();
    const styles = userViewStyle(color);
    return (
      <View style={styles.bodyContainer}>
        <View style={styles.imageContainer}>
          <AppImage
            source={item.profileUrlLarge}
            resizeMode="cover"
            style={styles.image}
          />
        </View>

        <View style={styles.itemMainContainer}>
          <View key={item.id} style={styles.itemContainer}>
            <View style={styles.userDetailContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.name}
                preset={'h3'}>
                {`${item.name}`}
              </Text>

              <View style={styles.locationContainer}>
                <AppImage
                  source={Images.LOCATION_IMAGE}
                  resizeMode="cover"
                  style={styles.locationIcon}
                />
                <Text
                  preset={'h5'}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.location}>
                  {item.location}
                </Text>
              </View>

              <View style={styles.extraContainer}>
                {item.extras.map((extraItem: Extra, index: number) => {
                  return (
                    <View
                      key={`${extraItem.tag}-${index}`}
                      style={[
                        styles.extraTextContainer,
                        { backgroundColor: extraItem.bodyColor },
                      ]}>
                      <Text
                        preset={'h5'}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                        style={[
                          styles.extraText,
                          {
                            color: extraItem.textColor,
                          },
                        ]}>
                        {extraItem.tag}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {isFavorite ? (
              <AnimatedTouchableOpacity
                containerStyle={styles.favIconContainer}
                onPress={() => handleUnFavorite(item)}>
                <AppImage
                  source={Images.STAR_FILL_IMAGE}
                  resizeMode="contain"
                  style={styles.favIcon}
                />
              </AnimatedTouchableOpacity>
            ) : (
              <AnimatedTouchableOpacity
                containerStyle={styles.favIconContainer}
                onPress={() => handleFavorite(item)}>
                <AppImage
                  source={Images.STAR_IMAGE}
                  resizeMode="contain"
                  style={styles.favIcon}
                />
              </AnimatedTouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
);
