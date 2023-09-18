import { StyleProp, ViewStyle } from 'react-native';

import { SVGIcons } from '@src/assets';

export type AnimationConfig = {
  easing?: (value: number) => number;
  duration?: number;
  delay?: number;
  scale?: number;
};

export type StarRatingProps = {
  rating: number;
  onChange?: (rating: number) => void;
  color?: string;
  emptyColor?: string;
  maxStars?: number;
  starSize?: number;
  isAnimate?: boolean;
  enableSwiping?: boolean;
  onRatingStart?: () => void;
  onRatingEnd?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  starStyle?: StyleProp<ViewStyle>;
  animationConfig?: AnimationConfig;
  emptyIcon?: SVGIcons;
  fillIcon?: SVGIcons;
  testID?: string;
};

export type AnimatedIconProps = {
  active: boolean;
  isAnimate: boolean;
  children: React.ReactElement;
  animationConfig: AnimationConfig;
  style?: StyleProp<ViewStyle>;
};
