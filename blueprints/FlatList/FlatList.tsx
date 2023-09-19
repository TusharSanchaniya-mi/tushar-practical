import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { useAppContext } from '@src/context';
import { scaleHeight, screenHeight } from '@src/utils';

import { EmptyFooterView } from './EmptyFooterView';
import { FlatListProps } from './FlatList.type';
import { FooterView } from './FooterView';
import { Text } from '../Text/Text';

export const FlatList = <T,>({ ...props }: FlatListProps<T>) => {
  const {
    currentPage = 0,
    data,
    hideEmptyComponent = false,
    isLoading = false,
    ListEmptyComponent,
    ListEmptyICON,
    ListFooterComponent = null,
    onPageMore,
    overrideStyles,
    refreshing = false,
    totalCount = 0,
    ...rest
  } = props;

  const { color } = useAppContext();

  const styles = flatListStyles();

  const renderEmptyComponent = () => {
    if (refreshing) {
      return null;
    } else {
      if (isLoading) {
        return (
          <View style={styles.indicatorContainer}>
            <FooterView
              color={
                overrideStyles?.emptyIndicatorColor
                  ? overrideStyles.emptyIndicatorColor
                  : color.primaryColor
              }
              indicatorStyle={[overrideStyles?.emptyIndicator]}
              footerViewVisible={isLoading}
            />
          </View>
        );
      } else {
        return (
          <View style={styles.emptyContainer}>
            {typeof ListEmptyComponent === 'string' && ListEmptyICON ? (
              <>
                {ListEmptyICON}
                <Text preset="h2">{ListEmptyComponent}</Text>
              </>
            ) : typeof ListEmptyComponent === 'string' ? (
              <Text preset="h2">{ListEmptyComponent}</Text>
            ) : ListEmptyICON ? (
              ListEmptyICON
            ) : ListEmptyComponent ? (
              ListEmptyComponent
            ) : hideEmptyComponent ? null : (
              <EmptyFooterView />
            )}
          </View>
        );
      }
    }
  };

  const renderFooterComponent = () => {
    return (
      <FooterView
        color={
          overrideStyles?.footerIndicatorColor
            ? overrideStyles.footerIndicatorColor
            : color.primaryColor
        }
        indicatorStyle={[
          styles.footerIndicatorStyle,
          overrideStyles?.footerIndicator,
        ]}
        customFooterView={ListFooterComponent}
        footerViewVisible={isLoading === true && currentPage > 1}
      />
    );
  };

  const loadMore = useCallback(() => {
    if (totalCount > 0 && data.length < totalCount) {
      onPageMore && onPageMore();
    } else {
      null;
    }
  }, [data.length, onPageMore, totalCount]);

  return (
    <FlashList
      {...rest}
      data={data}
      contentContainerStyle={overrideStyles?.contentContainerStyle}
      ListEmptyComponent={renderEmptyComponent}
      refreshing={refreshing}
      onEndReached={loadMore}
      onEndReachedThreshold={0.01}
      ListFooterComponent={renderFooterComponent}
    />
  );
};

export const flatListStyles = () => {
  const styles = StyleSheet.create({
    emptyContainer: {
      alignItems: 'center',
      height: screenHeight * 0.75,
      justifyContent: 'center',
    },
    footerIndicatorStyle: {
      marginTop: scaleHeight(30),
    },
    indicatorContainer: {
      alignItems: 'center',
      height: screenHeight * 0.75,
      justifyContent: 'center',
    },
  });

  return styles;
};
