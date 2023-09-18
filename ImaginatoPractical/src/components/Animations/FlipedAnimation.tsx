import React, { ReactElement, useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

import { AnimationType } from '.';

export const FlipedAnimation = ({
  animationType,
  index,
  item,
}: {
  item: ReactElement;
  index: number;
  animationType: AnimationType;
}) => {
  const rotateAnimateValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(rotateAnimateValue, {
      delay: index * 50,
      duration: 500,
      easing: Easing.linear,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [animationType, index, rotateAnimateValue]);

  return (
    <View>
      <Animated.View
        style={{
          transform: [
            {
              rotateX: rotateAnimateValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['90deg', '360deg'],
              }),
            },
          ],
        }}>
        {item}
      </Animated.View>
    </View>
  );
};
