import { StyleSheet } from 'react-native';

import {
  Palette,
  scaled,
  scaledSize,
  scaleHeight,
  scaleWidth,
} from '@src/utils';

export const userViewStyle = ({ black, darkGrey, lightGray, white }: Palette) =>
  StyleSheet.create({
    bodyContainer: {
      justifyContent: 'center',
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
    },
    favIconContainer: {
      padding: scaledSize(10),
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
    name: {
      color: black,
      fontSize: scaledSize(14),
    },
    userDetailContainer: {
      flex: 1,
      paddingVertical: scaledSize(16),
    },
  });
