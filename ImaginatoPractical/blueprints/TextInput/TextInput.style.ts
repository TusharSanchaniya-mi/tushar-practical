import { StyleSheet } from 'react-native';

import { Palette, scaledSize, scaleHeight, scaleWidth } from '@src/utils';

export const textInputStyles = ({ black, error, primaryColor }: Palette) =>
  StyleSheet.create({
    containerView: {
      alignItems: 'center',
      borderColor: primaryColor,
      borderRadius: scaledSize(8),
      borderWidth: scaleWidth(1),
      flexDirection: 'row',
      height: scaleHeight(48),
      overflow: 'hidden',
      paddingHorizontal: scaleWidth(5),
    },
    errorText: {
      color: error,
      fontSize: scaledSize(12),
      marginBottom: scaleHeight(15),
      marginHorizontal: scaleHeight(10),
      marginTop: scaleHeight(5),
    },
    mainContainerStyle: { overflow: 'hidden' },
    textInput: {
      color: black,
      flex: 1,
      fontSize: scaledSize(16),
      marginHorizontal: scaleWidth(6),
    },
    titleText: {
      fontSize: scaledSize(14),
      marginBottom: scaleHeight(4),
    },
  });
