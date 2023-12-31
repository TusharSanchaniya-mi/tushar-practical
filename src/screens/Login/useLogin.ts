import { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';

import { showToast } from '@app/blueprints';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

import { contents, useAppContext } from '@src/context';
import {
  clearCredentials,
  error,
  useAppDispatch,
  validateCredentials,
} from '@src/store';
import { Pattern } from '@src/utils';

import { loginStyles } from './Login.style';
import { loader } from '../../MainApp';

const useLogin = () => {
  const { color, navigation, ...props } = useAppContext();
  const styles = loginStyles(color);

  const [isPassVisible, setIsPassVisible] = useState(true);
  const passwordField = useRef<any>(null);

  const dispatch = useAppDispatch();
  const errorMessage = useSelector(error);

  const signInValidation = yup.object().shape({
    email: yup
      .string()
      .trim()
      .required(contents('login.requiredEmail'))
      .email(contents('login.emailInvalid'))
      .matches(Pattern.email, contents('login.emailInvalid')),
    password: yup
      .string()
      .trim()
      .required(contents('login.passwordRequired'))
      .min(6, contents('login.PasswordMinimumChar'))
      .max(20, contents('login.PasswordMaximumChar')),
  });

  const initialValues = {
    email: '',
    password: '',
  };
  /*
   * Check user for credentials
   */
  const handleLogin = useCallback(
    (values: typeof initialValues) => {
      Keyboard.dismiss();
      loader.current?.show();

      try {
        dispatch(
          validateCredentials({
            email: values.email,
            password: values.password,
          })
        );
      } catch (e) {
        showToast(contents('common.errorMessage'), 'error');
      } finally {
        loader.current?.hide();
      }
    },
    [dispatch]
  );

  const handleEyeToggle = useCallback(
    () => setIsPassVisible(!isPassVisible),
    [isPassVisible]
  );

  useEffect(() => {
    if (errorMessage) {
      showToast(contents('login.invalidCred'), 'error');
      dispatch(clearCredentials());
    }
  }, [dispatch, errorMessage]);

  return {
    color,
    contents,
    handleEyeToggle,
    handleLogin,
    initialValues,
    isPassVisible,
    navigation,
    passwordField,
    signInValidation,
    styles,
    ...props,
  };
};

export default useLogin;
