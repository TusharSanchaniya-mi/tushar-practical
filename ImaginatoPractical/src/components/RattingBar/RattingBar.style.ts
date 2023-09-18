import { StyleSheet } from 'react-native';

import { Easing } from 'react-native-reanimated';

import { Palette, scaleWidth } from '@src/utils';

import { AnimationConfig } from './RattigBar.type';

export const defaultFillColor = '#fdd835';
export const defaultEmptyColor = '#E0E0E0';
export const defaultAnimationConfig: Required<AnimationConfig> = {
  delay: 300,
  duration: 300,
  easing: Easing.elastic(2),
  scale: 1.2,
};

export const rattingBarStyle = ({}: Palette) =>
  StyleSheet.create({
    mainContainer: {
      paddingHorizontal: scaleWidth(5),
    },
    star: {
      marginHorizontal: scaleWidth(2),
    },
    starRating: {
      alignItems: 'center',
      alignSelf: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });
