import { StyleSheet } from 'react-native';

import {
  Palette,
  scaled,
  scaledSize,
  scaleHeight,
  scaleWidth,
} from '@src/utils';

export const homeStyles = ({
  backgroundColor,
  black,
  darkGrey,
  lightGray,
  primaryColor,
  white,
}: Palette) =>
  StyleSheet.create({
    bodyContainer: {
      justifyContent: 'center',
    },
    contentContainer: {
      paddingBottom: scaleHeight(100),
      paddingHorizontal: scaleWidth(10),
    },
    date: { fontSize: scaledSize(13) },
    debugIcon: {
      ...scaled(22),
    },
    extraContainer: {
      flexDirection: 'row',
      marginTop: scaleHeight(4),
    },
    extraText: {
      fontSize: scaledSize(10),
      textTransform: 'capitalize',
    },
    extraTextContainer: {
      borderRadius: scaledSize(4),
      marginEnd: scaledSize(8),
      paddingHorizontal: scaledSize(8),
      paddingVertical: scaledSize(4),
    },
    favIcon: {
      ...scaled(23),
      tintColor: primaryColor,
    },
    favIconContainer: {
      padding: scaledSize(10),
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
    image: {
      borderRadius: scaledSize(76),
      height: scaleWidth(68),
      width: scaleWidth(68),
    },
    imageContainer: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: white,
      borderRadius: scaledSize(76),
      height: scaleWidth(70),
      justifyContent: 'center',
      left: 0,
      overflow: 'hidden',
      position: 'absolute',
      width: scaleWidth(70),
      zIndex: 1111,
    },
    itemContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    itemMainContainer: {
      backgroundColor: white,
      borderRadius: scaledSize(8),
      elevation: 4,
      marginStart: scaledSize(20),
      paddingStart: scaledSize(60),
      shadowColor: black,
      shadowOffset: { height: 0.5, width: 0 },
      shadowOpacity: 0.125,
      shadowRadius: scaledSize(1),
    },
    itemSeparator: {
      height: scaleHeight(1),
      marginVertical: scaledSize(6),
      width: '100%',
    },
    loader: {
      marginTop: scaledSize(16),
    },
    location: {
      color: darkGrey,
      fontSize: scaledSize(10),
      marginStart: scaledSize(4),
    },
    locationContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    locationIcon: {
      height: scaleWidth(12),
      tintColor: lightGray,
      width: scaleWidth(12),
    },
    logout: {
      ...scaled(25),
      tintColor: black,
      transform: [{ rotate: '90deg' }],
    },
    name: {
      color: black,
      fontSize: scaledSize(14),
    },
    networkButton: {
      position: 'absolute',
      right: scaleWidth(5),
      ...scaled(20),
    },
    userDetailContainer: {
      flex: 1,
      paddingVertical: scaledSize(16),
    },
  });
