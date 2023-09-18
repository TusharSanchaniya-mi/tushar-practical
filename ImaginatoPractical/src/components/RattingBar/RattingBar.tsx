import React, { useRef } from 'react';
import {
  Animated,
  I18nManager,
  PanResponder,
  Pressable,
  View,
} from 'react-native';

import { SVGIcons } from '@src/assets';
import { useAppContext } from '@src/context';
import { scaledSize } from '@src/utils';

import { AnimatedIconProps, StarRatingProps } from './RattigBar.type';
import { getStars } from './Ratting.util';
import {
  defaultAnimationConfig,
  defaultEmptyColor,
  defaultFillColor,
  rattingBarStyle,
} from './RattingBar.style';
import { SvgIcon } from '../AppIcon/AppIcon';

const AnimPressable = Animated.createAnimatedComponent(Pressable);
export const RattingBar = React.memo(
  ({
    animationConfig = defaultAnimationConfig,
    color = defaultFillColor,
    containerStyle,
    emptyColor = defaultEmptyColor,
    emptyIcon = SVGIcons.EMPTY_STAR,
    enableSwiping = true,
    fillIcon = SVGIcons.STAR_ICON,
    isAnimate = true,
    maxStars = 5,
    onChange,
    onRatingEnd,
    onRatingStart,
    rating,
    starSize = 38,
    starStyle,
    testID,
  }: StarRatingProps) => {
    const { color: themeColor } = useAppContext();
    const width = React.useRef<number>();
    const [isInteracting, setInteracting] = React.useState(false);
    const styles = rattingBarStyle(themeColor);

    const handleInteraction = React.useCallback(
      (x: number, isRTL = I18nManager.isRTL) => {
        if (width.current) {
          if (isRTL) {
            handleInteraction(width.current - x, false);
            return;
          }
          const newRating = Math.max(
            0,
            Math.min(
              Math.round((x / width.current) * maxStars * 2 + 0.2) / 2,
              maxStars
            )
          );
          const finalRating = Math.ceil(newRating);

          if (finalRating !== rating) {
            onChange && onChange(finalRating);
          }
        }
      },
      [maxStars, onChange, rating]
    );

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderEnd: () => {
          onRatingEnd?.();
          setTimeout(() => {
            setInteracting(false);
          }, animationConfig.delay || defaultAnimationConfig.delay);
        },
        onPanResponderMove: e => {
          if (enableSwiping) {
            handleInteraction(e.nativeEvent.locationX);
          }
        },
        onPanResponderStart: e => {
          onRatingStart?.();
          handleInteraction(e.nativeEvent.locationX);
          setInteracting(true);
        },
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
      })
    ).current;

    return (
      <View style={[styles.mainContainer, containerStyle]}>
        <View
          style={styles.starRating}
          {...panResponder.panHandlers}
          onLayout={e => {
            width.current = e.nativeEvent.layout.width;
          }}
          testID={testID}>
          {getStars(rating, maxStars).map((starType, i) => {
            return (
              <AnimatedIcon
                isAnimate={isAnimate}
                key={i}
                active={isInteracting && rating - i >= 0.5}
                animationConfig={animationConfig}
                style={starStyle}>
                <SvgIcon
                  icon={starType === 'empty' ? emptyIcon : fillIcon}
                  height={scaledSize(starSize)}
                  width={scaledSize(starSize)}
                  pathFill={starType === 'empty' ? emptyColor : color}
                />
              </AnimatedIcon>
            );
          })}
        </View>
      </View>
    );
  }
);

const AnimatedIcon = React.memo(
  ({
    active,
    animationConfig,
    children,
    isAnimate,
    style,
  }: AnimatedIconProps) => {
    const { color: themeColor } = useAppContext();
    const styles = rattingBarStyle(themeColor);

    const {
      duration = defaultAnimationConfig.duration,
      easing = defaultAnimationConfig.easing,
      scale = defaultAnimationConfig.scale,
    } = animationConfig;

    const animatedSize = React.useRef(new Animated.Value(active ? scale : 1));

    React.useEffect(() => {
      const animation = Animated.timing(animatedSize.current, {
        duration,
        easing,
        toValue: active ? scale : 1,
        useNativeDriver: true,
      });

      animation.start();
      return animation.stop;
    }, [active, scale, easing, duration]);

    return (
      <AnimPressable
        pointerEvents="none"
        style={[
          styles.star,
          style,
          isAnimate && {
            transform: [
              {
                scale: animatedSize.current,
              },
            ],
          },
        ]}>
        {children}
      </AnimPressable>
    );
  }
);
