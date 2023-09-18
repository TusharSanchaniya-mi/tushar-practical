import { ColorValue, StyleProp, TextStyle } from 'react-native';

import { TextPresets } from '@app/blueprints';

export interface SwitchProps {
  defaultValue?: boolean;
  thumbColor?: ColorValue;
  thumbRingColor?: ColorValue;
  thumbRingWidth?: number;
  switchOffLabel?: string;
  switchOnLabel?: string;
  switchOnColor?: ColorValue;
  switchOffColor?: ColorValue;
  labelTextStyle?: StyleProp<TextStyle>;
  textPreset?: TextPresets;
  onSwitchPress?: (value: boolean) => void;
}
