import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { FieldInputProps, FieldMetaProps, FormikProps } from 'formik';

import { TextPresets } from '../Text/Text';

export interface FormikTextInputProps extends InputProps {
  name: string;
}

export interface InputProps extends RNTextInputProps {
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  leftIcon?: JSX.Element;
  titlePreset?: TextPresets;
  errorPreset?: TextPresets;
  rightIcon?: JSX.Element;
  textInputStyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  error?: string;
}

export type InputRef = React.Ref<RNTextInput>;

export interface FieldProps<V = any, FormValues = any> {
  field: FieldInputProps<V>;
  form: FormikProps<FormValues>;
  meta: FieldMetaProps<V>;
}
export type RefInputType = InstanceType<typeof RNTextInput>;
