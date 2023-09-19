import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useAppContext } from '@src/context';
import { moderateScale, Palette, scaleHeight, scaleWidth } from '@src/utils';

import { Text } from '../Text/Text';

const AnimatedButtonComponent =
  Animated.createAnimatedComponent(TouchableOpacity);

interface ExtraButtonProps {
  buttonContainerStyle?: StyleProp<ViewStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title?: React.ReactNode;
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
  isLoading?: boolean;
  showTitleOnLoading?: boolean;
  onDisabledStyle?: {
    buttonBackgroundColor?: string;
    titleColor?: string;
    loaderColor?: string;
  };
  transitionDuration?: number;
}

export type AnimatedButtonProps = Omit<
  TouchableOpacityProps,
  'onPressIn' | 'onPressOut' | 'style'
> & {
  containerStyle?: StyleProp<ViewStyle>;
  transitionDuration?: number;
};

export type ButtonProps = AnimatedButtonProps & ExtraButtonProps;

export const AnimatedTouchableOpacity = React.memo(
  (props: AnimatedButtonProps) => {
    const { containerStyle, transitionDuration = 100 } = props;
    const scaleValue = useSharedValue(1);

    const animatedButtonStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scaleValue.value }],
      };
    });

    return (
      <AnimatedButtonComponent
        style={[containerStyle, animatedButtonStyle]}
        layout={LinearTransition.duration(transitionDuration)}
        onPressIn={() => (scaleValue.value = withSpring(0.9))}
        onPressOut={() => (scaleValue.value = withSpring(1))}
        activeOpacity={0.8}
        {...props}>
        {props.children}
      </AnimatedButtonComponent>
    );
  }
);

export const AnimatedButton = React.memo((props: ButtonProps) => {
  const {
    buttonContainerStyle,
    isLoading,
    onDisabledStyle,
    showTitleOnLoading,
    title,
    titleContainerStyle,
    titleStyle,
    transitionDuration = 100,
  } = props;

  const { color } = useAppContext();

  const styles = buttonStyles(color);

  return (
    <AnimatedTouchableOpacity
      containerStyle={[
        styles.buttonContainer,
        (isLoading || props.disabled) && styles.disabled,
        (isLoading || props.disabled) && onDisabledStyle?.buttonBackgroundColor
          ? {
              backgroundColor: onDisabledStyle.buttonBackgroundColor,
            }
          : {},
        buttonContainerStyle,
      ]}
      {...props}>
      <Animated.View
        layout={LinearTransition.duration(transitionDuration)}
        style={[styles.titleContainer, titleContainerStyle]}>
        {props.leftIcon}
        {showTitleOnLoading || !isLoading ? (
          <Text
            preset="h3"
            color={
              (isLoading || props.disabled) && onDisabledStyle?.titleColor
                ? onDisabledStyle.titleColor
                : color.backgroundColor
            }
            style={titleStyle}>
            {title}
          </Text>
        ) : null}
        {isLoading ? (
          <ActivityIndicator
            color={
              (isLoading || props.disabled) && onDisabledStyle?.loaderColor
                ? onDisabledStyle.loaderColor
                : color.backgroundColor
            }
            style={showTitleOnLoading && styles.loader}
          />
        ) : null}
        {props.rightIcon}
      </Animated.View>
    </AnimatedTouchableOpacity>
  );
});

const buttonStyles = ({ lightGray, primaryColor }: Palette) =>
  StyleSheet.create({
    buttonContainer: {
      alignItems: 'center',
      backgroundColor: primaryColor,
      borderRadius: moderateScale(60),
      paddingHorizontal: scaleWidth(25),
      paddingVertical: scaleHeight(10),
    },
    disabled: {
      backgroundColor: lightGray,
    },
    loader: {
      marginLeft: scaleWidth(10),
    },
    titleContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });
