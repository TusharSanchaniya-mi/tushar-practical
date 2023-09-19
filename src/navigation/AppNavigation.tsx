import React from 'react';

import { NavigationContainerRef } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { isLoggedIn } from '@src/store';

import { NavStackParams } from './AppNavigation.type';
import { AuthStackNavigation } from './AuthStackNavigation';
import { MainStackNavigation } from './MainStackNavigation';

export const navigationRef =
  React.createRef<NavigationContainerRef<NavStackParams>>();

export const AppNavigation = () => {
  const isLogin = useSelector(isLoggedIn);

  return <>{isLogin ? <MainStackNavigation /> : <AuthStackNavigation />}</>;
};
