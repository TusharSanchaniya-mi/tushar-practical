import { StyleSheet } from 'react-native';

import { Palette, scaleHeight, scaleWidth } from '../../utils';

export const headerStyles = ({ white }: Palette) =>
  StyleSheet.create({
    backButtonContainer: {
      end: scaleWidth(25),
      padding: 10,
      position: 'absolute',
      zIndex: 1,
    },
    container: {
      alignItems: 'center',
      backgroundColor: white,
      elevation: 4,
      flexDirection: 'row',
      height: scaleHeight(50),
      justifyContent: 'center',
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 0,
      shadowRadius: 1,
      width: '100%',
    },
    iconContainerStyle: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    loginIconStyle: {
      height: scaleHeight(25),
      width: scaleHeight(25),
    },
    title: {
      color: white,
      textAlign: 'center',
      width: '100%',
    },
  });
