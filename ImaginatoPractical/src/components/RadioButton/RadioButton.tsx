import React, { useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@app/blueprints';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useAppContext } from '@src/context';
import { scaledSize, scaleWidth } from '@src/utils';

import { RADIO_BUTTON_SIZE, radioStyle } from './RadioButton.style';
import { RadioProps } from './RadioButton.type';
import { SvgIcon } from '../AppIcon/AppIcon';

export const Radio = React.memo(
  ({
    animationDuration = 250,
    containerStyle,
    defaultIcon,
    isSelected,
    onChange,
    radioCircleStyle,
    rippleColor,
    rippleOpacity = 0.2,
    rippleSize = 2.5,
    selectedIcon,
    size = RADIO_BUTTON_SIZE,
    textPreset,
    textStyle,
    title,
  }: RadioProps) => {
    const { color } = useAppContext();
    const styles = radioStyle(color);

    const rippleCircleScale = useSharedValue(1);
    const rippleCircleOpacity = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: rippleColor ?? color.black,
        opacity: rippleCircleOpacity.value,
        transform: [
          { scaleX: rippleCircleScale.value },
          { scaleY: rippleCircleScale.value },
        ],
      };
    });

    const handlePress = useCallback(() => {
      rippleCircleScale.value = 1;
      rippleCircleOpacity.value = rippleOpacity;

      rippleCircleScale.value = withTiming(
        rippleSize,
        {
          duration: animationDuration,
          easing: Easing.inOut(Easing.ease),
        },
        () => {
          rippleCircleOpacity.value = withTiming(0, {
            duration: animationDuration - 10,
            easing: Easing.inOut(Easing.ease),
          });
        }
      );
    }, [
      rippleCircleScale,
      rippleCircleOpacity,
      rippleOpacity,
      rippleSize,
      animationDuration,
    ]);

    const getAnimatedCircleSize = useMemo(() => {
      return {
        borderRadius: scaledSize(size),
        height: scaledSize(size),
        left: scaledSize(size / 2),
        width: scaledSize(size),
      };
    }, [size]);

    const getCircleRingSize = useMemo(() => {
      return {
        borderRadius: scaledSize(size),
        height: scaledSize(size),
        left: -scaleWidth(size) / 2,
        width: scaledSize(size),
      };
    }, [size]);

    const getInnerCircleRingSize = useMemo(() => {
      return {
        borderRadius: scaledSize(size),
        height: scaledSize(getCircleRingSize.height / 2),
        width: scaledSize(getCircleRingSize.width / 2),
      };
    }, [getCircleRingSize, size]);

    return (
      <Pressable
        style={[styles.mainContainer, containerStyle]}
        onPress={() => {
          handlePress();
          onChange && onChange();
        }}>
        <Animated.View
          style={[
            styles.radioFillAnimContainerStyle,
            animatedStyle,
            getAnimatedCircleSize,
          ]}
        />
        {!isSelected && defaultIcon ? (
          <SvgIcon
            icon={defaultIcon}
            height={scaledSize(size)}
            width={scaledSize(size)}
            style={[styles.svgIconContainer, radioCircleStyle]}
          />
        ) : isSelected && selectedIcon ? (
          <SvgIcon
            icon={selectedIcon}
            height={scaledSize(size)}
            width={scaledSize(size)}
            style={[styles.svgIconContainer, radioCircleStyle]}
          />
        ) : (
          <View style={[styles.radioFillContainerStyle, getCircleRingSize]}>
            {isSelected ? (
              <View style={[styles.radioFillStyle, getInnerCircleRingSize]} />
            ) : (
              <View
                style={[styles.radioNonFillStyle, getInnerCircleRingSize]}
              />
            )}
          </View>
        )}
        {title ? (
          <Text style={[styles.radioTextStyle, textStyle]} preset={textPreset}>
            {title}
          </Text>
        ) : null}
      </Pressable>
    );
  }
);
