import React from 'react';
import {
  TextInput as RNTextInput,
  // eslint-disable-next-line no-restricted-imports
  Text,
  View,
} from 'react-native';

import { Field, FieldProps } from 'formik';
import Animated, { FadeInLeft } from 'react-native-reanimated';

import { useColor } from '@src/context';

import { textInputStyles } from './TextInput.style';
import {
  FormikTextInputProps,
  InputProps,
  InputRef,
  RefInputType,
} from './TextInput.type';
import { Text as AppText } from '../Text/Text';

const AnimatedText = Animated.createAnimatedComponent(Text);

const FormikTextInput = (
  { name, ...props }: FormikTextInputProps,
  ref: InputRef
) => {
  return (
    <Field name={name}>
      {({ form, meta }: FieldProps) => {
        return (
          <Input
            onChangeText={text => {
              form?.handleChange(name)(text);
            }}
            onBlur={form?.handleBlur(name)}
            value={meta?.value}
            error={meta?.error && meta?.touched ? meta?.error ?? '' : ''}
            ref={ref}
            {...props}
          />
        );
      }}
    </Field>
  );
};

export const Input = React.memo(
  React.forwardRef((props: InputProps, ref: InputRef) => {
    const {
      containerStyle,
      error,
      inputContainerStyle,
      leftIcon,
      rightIcon,
      textInputStyle,
      title,
      titlePreset,
    } = props;

    const { color } = useColor();
    const styles = textInputStyles(color);

    return (
      <View style={[styles.mainContainerStyle, containerStyle]}>
        {title ? (
          <AppText preset={titlePreset} style={styles.titleText}>
            {title}
          </AppText>
        ) : null}
        <View style={[styles.containerView, inputContainerStyle]}>
          {leftIcon ? leftIcon : null}

          <RNTextInput
            ref={ref}
            blurOnSubmit={false}
            placeholderTextColor={color.lightGray}
            style={[styles.textInput, textInputStyle]}
            {...props}
          />

          {rightIcon ? rightIcon : null}
        </View>

        <AnimatedText
          layout={FadeInLeft.duration(120)}
          style={styles.errorText}>
          {error}
        </AnimatedText>
      </View>
    );
  })
);

export const TextInput = React.memo(
  React.forwardRef<RefInputType, FormikTextInputProps>(FormikTextInput)
);
