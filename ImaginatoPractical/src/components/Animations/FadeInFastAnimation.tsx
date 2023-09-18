import React, { MutableRefObject, ReactElement, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

export const FadeInFastAnimation = ({
  index,
  item,
  value,
}: {
  item: ReactElement;
  index: number;
  value: MutableRefObject<Animated.Value>;
}) => {
  var itemPerIndex = 1;
  const movedByPosition = (1 - 1 / itemPerIndex) * index;

  // Fade In fast
  useEffect(() => {
    var fadeInDuration = 1000;
    var delayInDuration = 1000;
    var durationPerItem = 150;
    value.current.setValue(0);
    Animated.timing(value.current, {
      delay: delayInDuration,
      duration: fadeInDuration * durationPerItem,
      easing: Easing.linear,
      toValue: fadeInDuration + 1,
      useNativeDriver: true,
    }).start();
  }, [value]);

  return (
    <Animated.View
      style={{
        opacity: value.current.interpolate({
          extrapolate: 'clamp',
          inputRange:
            index === 0
              ? [-1, 0, 1, 2]
              : [
                  index - 1 - movedByPosition,
                  index - movedByPosition,
                  index + 1 - movedByPosition,
                  index + 2 - movedByPosition,
                ],
          outputRange: [0, 0, 1, 1],
        }),
      }}>
      {item}
    </Animated.View>
  );
};
