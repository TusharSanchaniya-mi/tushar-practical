import { ColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { TextPresets } from '@app/blueprints';

import { SVGIcons } from '@src/assets';

export interface RadioProps {
  title?: string;
  isSelected?: boolean;
  textPreset?: TextPresets;
  rippleColor?: ColorValue;
  rippleSize?: number;
  rippleOpacity?: number;
  animationDuration?: number;
  defaultIcon?: SVGIcons;
  selectedIcon?: SVGIcons;
  size?: number;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  radioCircleStyle?: StyleProp<ViewStyle>;
  onChange?: () => void;
}
