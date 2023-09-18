import React, { ReactElement, useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

import { AnimationType } from '.';

export const SlideDownAnimation = ({
  animationType,
  index,
  item,
}: {
  item: ReactElement;
  index: number;
  animationType: AnimationType;
}) => {
  const slideRightAnimatedValue = useRef(new Animated.Value(0)).current;
  const translateY = slideRightAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').height, 0],
  });
  useEffect(() => {
    Animated.spring(slideRightAnimatedValue, {
      delay: index * 10,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [animationType, index, slideRightAnimatedValue]);

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY,
          },
        ],
      }}>
      {item}
    </Animated.View>
  );
};
