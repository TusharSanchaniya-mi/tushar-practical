import { StyleSheet } from 'react-native';

import {
  Palette,
  scaled,
  scaledSize,
  scaleHeight,
  scaleWidth,
} from '@src/utils';

export const loginStyles = ({
  backgroundColor,
  black,
  lightGray,
  primaryColor,
  white,
}: Palette) =>
  StyleSheet.create({
    activeBtnContainer: {
      backgroundColor: primaryColor,
    },
    activeInputStyle: {
      borderBottomColor: primaryColor,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomWidth: scaleHeight(1),
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
    },
    btnContainer: {
      backgroundColor: lightGray,
      borderRadius: scaledSize(8),
      marginTop: scaleHeight(40),
      paddingVertical: scaleHeight(5),
    },
    commonInputTextStyle: {
      fontSize: scaledSize(14),
    },
    container: {
      backgroundColor: backgroundColor,
      flex: 1,
      paddingHorizontal: scaleWidth(18),
    },
    emailTextInputContainer: {
      marginTop: scaleHeight(60),
    },
    eyeOffIcon: {
      ...scaled(18),
      marginRight: scaleWidth(5),
    },
    flexGrow: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center',
    },
    formContainerStyle: {
      backgroundColor: white,
      borderRadius: scaledSize(10),
      elevation: 1,
      height: '85%',
      padding: scaledSize(10),
      paddingHorizontal: scaledSize(16),
      shadowColor: black,
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 0.2,
      shadowRadius: scaledSize(2),
      width: '95%',
    },
    iconContainerStyle: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: white,
      borderRadius: scaledSize(70),
      height: scaleHeight(70),
      justifyContent: 'center',
      marginTop: -scaleHeight(70) / 1.5,
      width: scaleHeight(70),
    },
    iconStyle: {
      ...scaled(18),
    },
    inActiveBtnContainer: {
      backgroundColor: lightGray,
    },
    inActiveInputStyle: {
      borderBottomColor: lightGray,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomWidth: scaleHeight(1),
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
    },
    loginIconStyle: {
      height: scaleHeight(45),
      width: scaleHeight(45),
    },
    loginText: {
      color: white,
      fontSize: scaledSize(16),
      marginVertical: scaleHeight(4),
    },
    passwordTextInputContainer: {
      marginTop: scaledSize(4),
    },
    titleStyles: {
      alignSelf: 'center',
      color: black,
      fontWeight: '700',
      marginTop: scaleHeight(50),
    },
  });
