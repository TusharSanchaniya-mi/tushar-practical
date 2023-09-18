import React, { ReactElement, useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

export const SlideLeftAnimation = ({
  index,
  item,
}: {
  item: ReactElement;
  index: number;
}) => {
  const ref = useRef(new Animated.Value(0)).current;
  let translateX = ref.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').width, 0],
  });
  useEffect(() => {
    Animated.spring(ref, {
      delay: index * 4,
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {});
  }, [ref, index]);

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateX,
          },
        ],
      }}>
      {item}
    </Animated.View>
  );
};
