import React from 'react';

import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { NavStackParams, Screen } from './AppNavigation.type';
import { BottomTabNavigation } from './BottomTabNavigation';

const MainStack = createNativeStackNavigator<NavStackParams>();

const screenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  headerShown: false,
  orientation: 'portrait',
};

export const MainStackNavigation = () => {
  return (
    <MainStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={Screen.BOTTOM_TAB_NAVIGATION}>
      <MainStack.Screen
        name={Screen.BOTTOM_TAB_NAVIGATION}
        options={{
          gestureEnabled: false,
        }}
        component={BottomTabNavigation}
      />
    </MainStack.Navigator>
  );
};
