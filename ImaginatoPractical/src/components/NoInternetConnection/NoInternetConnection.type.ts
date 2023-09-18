import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { TextPresets } from '@app/blueprints';

import { SVGIcons } from '@src/assets';

export interface NoInternetConnectionProps {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textPreset?: TextPresets;
  showIcon?: boolean;
  noInternetIcon?: SVGIcons;
  noInternetText?: string;
  showRetryButton?: boolean;
  onRetryPress?: () => void;
}
