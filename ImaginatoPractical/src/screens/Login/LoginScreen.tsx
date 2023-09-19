import React from 'react';
import { Keyboard, View } from 'react-native';

import {
  AnimatedButton,
  AnimatedTouchableOpacity,
  Text,
  TextInput,
} from '@app/blueprints';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Images } from '@src/assets';
import { AppImage, BaseLayout } from '@src/components';

import useLogin from './useLogin';

const LoginScreen = () => {
  const {
    color,
    contents,
    handleEyeToggle,
    handleLogin,
    initialValues,
    isPassVisible,
    passwordField,
    signInValidation,
    styles,
  } = useLogin();

  return (
    <BaseLayout>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flexGrow}>
        <View style={styles.formContainerStyle}>
          <View style={styles.iconContainerStyle}>
            <AppImage
              source={Images.APP_LOGO_IMAGE}
              resizeMode="contain"
              style={styles.loginIconStyle}
            />
          </View>

          <Text style={styles.titleStyles} preset="h1">
            {contents('login.loginAcc')}
          </Text>

          <Formik
            validationSchema={signInValidation}
            initialValues={initialValues}
            validateOnMount={true}
            validateOnChange={true}
            onSubmit={handleLogin}>
            {({ handleSubmit, isValid, values }) => {
              return (
                <View>
                  <TextInput
                    placeholder={contents('login.email')}
                    autoCapitalize="none"
                    returnKeyType={'next'}
                    inputMode={'email'}
                    keyboardType="email-address"
                    containerStyle={[styles.emailTextInputContainer]}
                    inputContainerStyle={[
                      values.email?.length > 0
                        ? styles.activeInputStyle
                        : styles.inActiveInputStyle,
                    ]}
                    textInputStyle={[styles.commonInputTextStyle]}
                    onSubmitEditing={() => passwordField?.current?.focus()}
                    id={'email'}
                    leftIcon={
                      <AppImage
                        tintColor={color.primaryColor}
                        source={Images.EMAIL_LOGO_IMAGE}
                        style={styles.iconStyle}
                      />
                    }
                    name={'email'}
                  />
                  <TextInput
                    placeholder={contents('login.password')}
                    autoCapitalize="none"
                    returnKeyType={'done'}
                    containerStyle={styles.passwordTextInputContainer}
                    inputContainerStyle={[
                      values.password?.length > 0
                        ? styles.activeInputStyle
                        : styles.inActiveInputStyle,
                    ]}
                    textInputStyle={styles.commonInputTextStyle}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    leftIcon={
                      <AppImage
                        tintColor={color.primaryColor}
                        source={Images.LOCK_IMAGE}
                        style={styles.iconStyle}
                      />
                    }
                    rightIcon={
                      <AnimatedTouchableOpacity onPress={handleEyeToggle}>
                        <AppImage
                          tintColor={color.primaryColor}
                          source={
                            isPassVisible
                              ? Images.EYE_SHOW_IMAGE
                              : Images.EYE_HIDE_IMAGE
                          }
                          style={styles.eyeOffIcon}
                        />
                      </AnimatedTouchableOpacity>
                    }
                    secureTextEntry={isPassVisible}
                    id={'password'}
                    name={'password'}
                    keyboardType="ascii-capable"
                  />

                  <AnimatedButton
                    title={contents('login.login')}
                    disabled={!isValid}
                    containerStyle={[
                      styles.btnContainer,
                      isValid
                        ? styles.activeBtnContainer
                        : styles.inActiveBtnContainer,
                    ]}
                    titleStyle={styles.loginText}
                    onPress={() => handleSubmit()}
                  />
                </View>
              );
            }}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </BaseLayout>
  );
};

export default React.memo(LoginScreen);
