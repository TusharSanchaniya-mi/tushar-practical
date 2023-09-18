import { appServices } from '@src/services';

import { useLanguage } from './LocalizationContext';
import { storage } from './storage';
import { useColor } from './ThemeContext';
import { loader } from '../MainApp';
import type { AppNavigationProp } from '../navigation/AppNavigation.type';
import {
  useWithNavigation,
  WithNavigation,
} from '../navigation/withNavigation';

export const useAppContextOnly = () => {
  const { ...color } = useColor();
  const { ...language } = useLanguage();

  return {
    loader: loader.current,
    services: appServices,
    storage,
    ...color,
    ...language,
  };
};

export type AppContextType = ReturnType<typeof useAppContextOnly>;

export const useAppContext = (): WithNavigation<
  AppNavigationProp,
  AppContextType
> => {
  return useWithNavigation<AppNavigationProp, AppContextType>(
    useAppContextOnly()
  );
};
