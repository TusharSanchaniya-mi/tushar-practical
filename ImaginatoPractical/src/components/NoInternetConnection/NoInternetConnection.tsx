import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AnimatedButton, Text } from '@app/blueprints';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

import { SVGIcons } from '@src/assets';
import { contents, useAppContext } from '@src/context';
import { Palette, scaleHeight, scaleWidth } from '@src/utils';

import { NoInternetConnectionProps } from './NoInternetConnection.type';
import { SvgIcon } from '../AppIcon/AppIcon';

export const NoInternetConnection = React.memo(
  ({
    containerStyle,
    noInternetIcon = SVGIcons.NO_INTERNET,
    noInternetText,
    onRetryPress,
    showIcon = true,
    showRetryButton = true,
    textPreset = 'h4',
    textStyle,
  }: NoInternetConnectionProps) => {
    const { color } = useAppContext();
    const [isNetworkReachable, setIsNetworkReachable] =
      useState<boolean>(false);
    const networkInfo = useRef<NetInfoState>();

    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        networkInfo.current = state;
        setIsNetworkReachable(state?.isConnected ?? false);
      });

      return () => {
        unsubscribe();
      };
    }, []);
    const styles = noNetworkConnectionStyle(color);
    return isNetworkReachable === false ? (
      <View style={[styles.container, containerStyle]}>
        {showIcon ? (
          <SvgIcon
            icon={noInternetIcon}
            height={scaleHeight(200)}
            width={scaleWidth(200)}
          />
        ) : null}
        <Text
          preset={textPreset}
          style={[styles.noInternetConnectionLabel, textStyle]}>
          {noInternetText ?? contents('common.noInternetConnection')}
        </Text>
        {showRetryButton ? (
          <AnimatedButton
            title={contents('common.retry')}
            onPress={() => onRetryPress && onRetryPress()}
            buttonContainerStyle={styles.retryButtonContainer}
            titleStyle={styles.retryButtonText}
          />
        ) : null}
      </View>
    ) : null;
  }
);

const noNetworkConnectionStyle = ({ backgroundColor, primaryColor }: Palette) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: backgroundColor,
      height: '100%',
      paddingTop: scaleHeight(100),
      zIndex: 999,
    },
    noInternetConnectionLabel: {
      textAlign: 'center',
      width: '80%',
    },
    retryButtonContainer: {
      backgroundColor: primaryColor,
      marginTop: scaleHeight(10),
      width: '55%',
    },
    retryButtonText: {
      color: backgroundColor,
    },
  });
