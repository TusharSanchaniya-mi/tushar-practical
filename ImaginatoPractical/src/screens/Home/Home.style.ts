import { StyleSheet } from 'react-native';

import { Palette } from '@src/utils';

export const homeStyles = ({}: Palette) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
  });
