import React from 'react';

import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { LoginScreen } from '@src/screens';

import { NavStackParams, Screen } from './appNavigation.type';

const AuthStack = createNativeStackNavigator<NavStackParams>();

const screenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  headerShown: false,
  orientation: 'portrait',
};

export const AuthStackNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={Screen.LOGIN_SCREEN}>
      <AuthStack.Screen name={Screen.LOGIN_SCREEN} component={LoginScreen} />
    </AuthStack.Navigator>
  );
};
