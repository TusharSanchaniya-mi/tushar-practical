import React, { useMemo, useState } from 'react';
import { Pressable } from 'react-native';

import { Text } from '@app/blueprints';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useAppContext } from '@src/context';
import { scaledSize } from '@src/utils';

import { SWITCH_WIDTH, switchStyle, THUMB_SIZE } from './Switch.style';
import { SwitchProps } from './Switch.type';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Switch = React.memo(
  ({
    defaultValue,
    labelTextStyle,
    onSwitchPress,
    switchOffColor,
    switchOffLabel,
    switchOnColor,
    switchOnLabel,
    textPreset,
    thumbColor,
    thumbRingColor,
    thumbRingWidth,
  }: SwitchProps) => {
    const { color } = useAppContext();
    const styles = switchStyle(color);
    const [switchTranslate, setSwitchTranslate] = useState<boolean>(
      defaultValue ?? false
    );

    const translateX = useSharedValue(
      defaultValue ? SWITCH_WIDTH - THUMB_SIZE + 5 : 0
    );

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }],
      };
    });

    const handleToggle = () => {
      const newValue = !switchTranslate;
      setSwitchTranslate(prev => {
        onSwitchPress && onSwitchPress(!prev);
        return !prev;
      });
      translateX.value = withSpring(
        newValue ? SWITCH_WIDTH - THUMB_SIZE + 5 : 0,
        {
          damping: 1000,
          mass: 1,
          stiffness: 80,
        }
      );
    };

    const animatedBGStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        switchTranslate ? 1 : 0,
        [0, 1],
        [
          (switchOffColor as string) ?? color.lightGray,
          (switchOnColor as string) ?? color.lightGreen,
        ]
      );
      return {
        backgroundColor,
      };
    });

    const getThumbColor = useMemo(() => {
      return {
        backgroundColor: thumbColor ?? color.primaryColor,
        borderColor: thumbRingColor ?? color.primaryColor,
        borderWidth: scaledSize(thumbRingWidth ?? 2),
      };
    }, [color, thumbColor, thumbRingColor, thumbRingWidth]);

    return (
      <AnimatedPressable
        onPress={handleToggle}
        style={[styles.container, animatedBGStyle]}>
        <Animated.View
          style={[styles.thumbStyle, getThumbColor, animatedStyle]}
        />
        {switchOnLabel && switchOffLabel ? (
          <Text
            preset={textPreset}
            numberOfLines={1}
            lineBreakMode="tail"
            style={[
              switchTranslate
                ? styles.switchOnLabelStyle
                : styles.switchOffLabelStyle,
              labelTextStyle,
            ]}>
            {switchTranslate ? switchOnLabel : switchOffLabel}
          </Text>
        ) : null}
      </AnimatedPressable>
    );
  }
);
