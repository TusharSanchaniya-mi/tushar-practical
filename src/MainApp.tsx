import React, { createRef } from 'react';

import { IndicatorRef, IndicatorView, ToastView } from '@app/blueprints';
import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { LocalizationProvider } from './context/LocalizationContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppNavigation, navigationRef } from './navigation/AppNavigation';
import { ErrorBoundary } from './screens/ErrorBoundary/ErrorBoundary';
import store, { persistor } from './store';

export const loader = createRef<IndicatorRef>();
export const MainApp = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <LocalizationProvider>
          <NavigationContainer
            ref={navigationRef}
            onReady={() =>
              RNBootSplash.hide({
                fade: true,
              })
            }>
            <ErrorBoundary catchErrors={'always'}>
              {/**
               * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
               * and saved to redux.
               * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
               * for example `loading={<SplashScreen />}`.
               * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
               */}
              <PersistGate loading={null} persistor={persistor}>
                <AppNavigation />
                <IndicatorView isLoading={false} ref={loader} />
                <ToastView />
              </PersistGate>
            </ErrorBoundary>
          </NavigationContainer>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
};
