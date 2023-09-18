import React, { ReactElement, useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

import { AnimationType } from '.';

export const EffectiveAnimation = ({
  animationType,
  index,
  item,
}: {
  item: ReactElement;
  index: number;
  animationType: AnimationType;
}) => {
  const yAxis = useRef(new Animated.Value(0)).current;

  const translateY = yAxis.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').height, 0],
  });

  const width = useRef(new Animated.Value(0)).current;
  const scaleX = width.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [1, 0.5, 1],
  });

  const height = useRef(new Animated.Value(0)).current;
  const scaleY = height.interpolate({
    inputRange: [0, 0.67, 1],
    outputRange: [1, 0.5, 1],
  });

  useEffect(() => {
    Animated.parallel([
      Animated.spring(yAxis, {
        delay: 100,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(width, {
        delay: index * 50,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(height, {
        delay: index * 50,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animationType, height, index, width, yAxis]);

  return (
    <Animated.View
      style={{
        transform: [{ translateY }, { scaleX }, { scaleY }],
      }}>
      {item}
    </Animated.View>
  );
};
