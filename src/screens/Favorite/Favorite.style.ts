import { StyleSheet } from 'react-native';

import { Palette, scaledSize, scaleHeight, screenHeight } from '@src/utils';

export const favoriteStyles = ({ black, white }: Palette) =>
  StyleSheet.create({
    bodyContainer: {
      backgroundColor: white,
      flex: 1,
      marginTop: 1,
    },
    contentContainer: {
      paddingBottom: scaleHeight(100),
    },
    emptyContainer: {
      alignItems: 'center',
      height: screenHeight - scaleHeight(100),
      justifyContent: 'center',
    },
    flatListStyles: {
      paddingTop: scaleHeight(10),
    },
    noFavoritesText: {
      color: black,
      textAlign: 'center',
    },
    userDetailContainer: {
      flex: 1,
      marginHorizontal: scaledSize(12),
    },
  });
