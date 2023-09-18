import { StyleSheet } from 'react-native';

import { Palette, scaleHeight, scaleWidth } from '@src/utils';

export const SWITCH_WIDTH = 45;
export const THUMB_SIZE = 20;
export const paddingHorizontal = scaleWidth(10);

export const switchStyle = ({ primaryColor }: Palette) =>
  StyleSheet.create({
    container: {
      borderRadius: 15,
      height: scaleHeight(14),
      justifyContent: 'center',
      width: scaleWidth(SWITCH_WIDTH),
    },
    switchOffLabelStyle: {
      fontSize: scaleHeight(10),
      position: 'absolute',
      right: scaleWidth(5),
    },
    switchOnLabelStyle: {
      fontSize: scaleHeight(10),
      left: scaleWidth(5),
      position: 'absolute',
    },
    thumbStyle: {
      backgroundColor: primaryColor,
      borderRadius: scaleHeight(15),
      height: scaleHeight(THUMB_SIZE),
      width: scaleWidth(THUMB_SIZE),
    },
  });
