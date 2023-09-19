import { StyleSheet } from 'react-native';

import {
  Palette,
  scaled,
  scaledSize,
  scaleHeight,
  scaleWidth,
} from '@src/utils';

export const favoriteViewStyles = ({
  black,
  borderColor,
  primaryColor,
  white,
}: Palette) =>
  StyleSheet.create({
    favIcon: {
      ...scaled(28),
      tintColor: primaryColor,
    },
    favIconContainer: {
      padding: scaledSize(10),
    },
    flatListStyles: {
      paddingTop: scaleHeight(10),
    },
    itemContainer: {
      alignItems: 'center',
      backgroundColor: white,
      elevation: 4,
      flex: 1,
      flexDirection: 'row',
      marginVertical: scaleWidth(4),
      paddingHorizontal: scaleWidth(16),
      paddingVertical: scaleHeight(8),
    },
    itemSeparator: {
      backgroundColor: borderColor,
      height: 1,
      width: '100%',
    },
    userDetailContainer: {
      flex: 1,
      marginHorizontal: scaledSize(12),
    },
    userImage: {
      borderRadius: scaledSize(45),
      height: scaleWidth(45),
      tintColor: primaryColor,
      width: scaleWidth(45),
    },
    userName: {
      color: black,
      fontSize: scaledSize(16),
    },
  });
