import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { FooterViewProps } from './FlatList.type';

export const FooterView = React.memo(
  ({
    color,
    customFooterView,
    footerViewVisible,
    indicatorStyle,
  }: FooterViewProps) => {
    return (
      <View>
        {footerViewVisible &&
        (customFooterView === null || customFooterView === undefined) ? (
          <ActivityIndicator
            size={'large'}
            color={color}
            style={indicatorStyle}
          />
        ) : customFooterView ? (
          customFooterView
        ) : null}
      </View>
    );
  }
);
