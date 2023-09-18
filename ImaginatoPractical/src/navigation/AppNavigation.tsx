import React from 'react';

import { NavigationContainerRef } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { isLoggedIn } from '@src/store';
import { logger } from '@src/utils';

import { NavStackParams } from './appNavigation.type';
import { AuthStackNavigation } from './AuthStackNavigation';

export const navigationRef =
  React.createRef<NavigationContainerRef<NavStackParams>>();

export const AppNavigation = () => {
  const isLogin = useSelector(isLoggedIn);
  logger('>>>', isLogin);
  return <>{<AuthStackNavigation />}</>;
};
