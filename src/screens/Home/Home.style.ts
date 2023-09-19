import { StyleSheet } from 'react-native';

import {
  Palette,
  scaled,
  scaledSize,
  scaleHeight,
  scaleWidth,
} from '@src/utils';

export const homeStyles = ({ backgroundColor, black }: Palette) =>
  StyleSheet.create({
    contentContainer: {
      paddingBottom: scaleHeight(100),
      paddingHorizontal: scaleWidth(10),
    },
    date: { fontSize: scaledSize(13) },
    debugIcon: {
      ...scaled(22),
    },
    flatListStyles: {
      backgroundColor: backgroundColor,
      paddingTop: scaleHeight(10),
    },
    headerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: scaleHeight(10),
    },
    itemSeparator: {
      height: scaleHeight(1),
      marginVertical: scaledSize(6),
      width: '100%',
    },
    loader: {
      marginTop: scaledSize(16),
    },
    logout: {
      ...scaled(25),
      tintColor: black,
      transform: [{ rotate: '90deg' }],
    },
    networkButton: {
      position: 'absolute',
      right: scaleWidth(5),
      ...scaled(20),
    },
  });
