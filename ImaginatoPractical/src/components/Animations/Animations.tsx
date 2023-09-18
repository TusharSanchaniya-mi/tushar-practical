import type { ReactElement } from 'react';
import React from 'react';
import { Animated } from 'react-native';

import { EffectiveAnimation } from './EffectiveAnimation';
import { FadeInFastAnimation } from './FadeInFastAnimation';
import { FlipedAnimation } from './FlipedAnimation';
import { SlideDownAnimation } from './SlideDownAnimation';
import { SlideLeftAnimation } from './SlideLeftAnimation';

import { AnimationType } from '.';

export const Animations = ({
  animationType,
  fadeInLastAnimationValue,
  index,
  item,
}: {
  item: ReactElement;
  index: number;
  animationType: AnimationType;
  fadeInLastAnimationValue?: React.MutableRefObject<Animated.Value>;
}) => {
  return (
    <>
      {animationType === 'FADE_IN_FAST' && fadeInLastAnimationValue ? (
        <FadeInFastAnimation
          index={index}
          item={item}
          value={fadeInLastAnimationValue}
        />
      ) : animationType === 'SLIDE_LEFT' ? (
        <SlideLeftAnimation index={index} item={item} />
      ) : animationType === 'SLIDE_DOWN' ? (
        <SlideDownAnimation
          index={index}
          item={item}
          animationType={animationType}
        />
      ) : animationType === 'FLIPPED' ? (
        <FlipedAnimation
          index={index}
          item={item}
          animationType={animationType}
        />
      ) : animationType === 'EFFECTIVE' ? (
        <EffectiveAnimation
          index={index}
          item={item}
          animationType={animationType}
        />
      ) : (
        item
      )}
    </>
  );
};
