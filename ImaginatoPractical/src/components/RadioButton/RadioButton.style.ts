import { StyleSheet } from 'react-native';

import { Palette, scaleHeight, scaleWidth } from '@src/utils';

export const RADIO_BUTTON_SIZE = 20;

export const radioStyle = ({ black, lightGray, white }: Palette) =>
  StyleSheet.create({
    iconStyleContainer: {
      borderRadius: scaleHeight(RADIO_BUTTON_SIZE),
      height: scaleHeight(RADIO_BUTTON_SIZE),
      width: scaleWidth(RADIO_BUTTON_SIZE),
    },
    mainContainer: {
      alignItems: 'center',
      alignSelf: 'center',
      flexDirection: 'row',
    },
    radioFillAnimContainerStyle: {
      alignItems: 'center',
      backgroundColor: white,
      justifyContent: 'center',
    },
    radioFillContainerStyle: {
      alignItems: 'center',
      borderColor: black,
      borderWidth: scaleHeight(1.5),
      justifyContent: 'center',
    },
    radioFillStyle: {
      alignItems: 'center',
      backgroundColor: black,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    radioNonFillStyle: {
      alignItems: 'center',
      backgroundColor: lightGray,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    radioTextStyle: {
      color: black,
      fontSize: scaleHeight(12),
    },
    svgIconContainer: {},
  });
