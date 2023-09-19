import React from 'react';

import Toast, { BaseToast, ToastConfig } from 'react-native-toast-message';

import { useAppContext } from '@src/context';

type ToastType = 'success' | 'error';

export const ToastView = () => {
  const { color } = useAppContext();

  const toastConfig: ToastConfig = {
    error: ({ text1 }) =>
      (text1 ?? '').length === 0 ? null : (
        <BaseToast
          style={{
            backgroundColor: color.errorBg,
            borderLeftColor: color.red,
          }}
          text1={text1}
          text1NumberOfLines={2}
          text1Style={{ color: color.black }}
        />
      ),

    success: ({ text1 }) =>
      (text1 ?? '').length === 0 ? null : (
        <BaseToast
          style={{
            backgroundColor: color.white,
            borderLeftColor: color.progressGreen,
          }}
          text1={text1}
          text1NumberOfLines={2}
          text1Style={{ color: color.black }}
        />
      ),
  };
  return <Toast config={toastConfig} autoHide={true} visibilityTime={3000} />;
};

export function showToast(message: string, type: ToastType = 'success') {
  Toast.show({
    autoHide: true,
    text1: message,
    type: type,
  });
}
