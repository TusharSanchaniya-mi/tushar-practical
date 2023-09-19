import React from 'react';
import { View } from 'react-native';

import { AnimatedTouchableOpacity, Text } from '@app/blueprints';

import { Images } from '@src/assets';
import { AppImage } from '@src/components';
import { useAppContext } from '@src/context';
import type { Extra, UserList } from '@src/services';

import { homeStyles } from '../Home.style';

interface UserViewProps {
  item: UserList;
  onUnFavouritePress: (item: UserList) => void;
  onFavouritePress: (item: UserList) => void;
  isFavourite: boolean;
}

export const UserView = React.memo(
  ({
    isFavourite,
    item,
    onFavouritePress,
    onUnFavouritePress,
  }: UserViewProps) => {
    const { color } = useAppContext();
    const styles = homeStyles(color);
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

            {isFavourite ? (
              <AnimatedTouchableOpacity
                containerStyle={styles.favIconContainer}
                onPress={() => onUnFavouritePress(item)}>
                <AppImage
                  source={Images.STAR_FILL_IMAGE}
                  resizeMode="contain"
                  style={styles.favIcon}
                />
              </AnimatedTouchableOpacity>
            ) : (
              <AnimatedTouchableOpacity
                containerStyle={styles.favIconContainer}
                onPress={() => onFavouritePress(item)}>
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
