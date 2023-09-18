import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { NewsResult } from '@src/services';

export enum Screen {
  BOTTOM_TAB_NAVIGATION = 'BOTTOM_TAB_NAVIGATION',
  HOME = 'HOME',
  FAVORITE = 'FAVORITE',
  LOGIN_SCREEN = 'LOGIN_SCREEN',
}

export type NavStackParams = {
  [Screen.BOTTOM_TAB_NAVIGATION]?: NavigatorScreenParams<BottomTabStackParamList>;
  [Screen.HOME]?: undefined;
  [Screen.FAVORITE]?: undefined;
  [Screen.LOGIN_SCREEN]: undefined;
};

export type BottomTabStackParamList = {
  [Screen.HOME]?: undefined;
  [Screen.FAVORITE]?: undefined;
};

export type NewsDetailParams = {
  item: NewsResult;
};

export type AppNavigationProp = NativeStackNavigationProp<NavStackParams>;
