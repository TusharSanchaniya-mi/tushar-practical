import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from 'react-native';

import { Images } from '@src/assets';
import { AppImage, BaseLayout, Header } from '@src/components';
import type { UserList } from '@src/services';

import useHome from './useHome';
import { UserView } from './views';
import { AnimatedTouchableOpacity } from '../../../blueprints/Button/Button';

const HomeScreen = () => {
  const {
    color,
    handleFavorite,
    handleLogout,
    handleUnFavorite,
    isFavorite,
    isLoading,
    isRefreshing,
    onNextPage,
    onPullToRefresh,
    styles,
    usersList,
  } = useHome();

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const renderFooter = () => {
    return (
      <>
        {isLoading && !isRefreshing ? (
          <ActivityIndicator
            size="large"
            color={color.primaryColor}
            style={styles.loader}
          />
        ) : null}
      </>
    );
  };

  const renderItem = ({ item }: { item: UserList }) => {
    return (
      <UserView
        item={item}
        handleUnFavorite={handleUnFavorite}
        handleFavorite={handleFavorite}
        isFavorite={isFavorite(item.id)}
      />
    );
  };

  return (
    <BaseLayout>
      <Header
        rightComponent={
          <AnimatedTouchableOpacity onPress={handleLogout}>
            <AppImage
              source={Images.LOGOUT_IMAGE}
              resizeMode="contain"
              style={styles.logout}
            />
          </AnimatedTouchableOpacity>
        }
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={usersList}
        ItemSeparatorComponent={renderItemSeparator}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.contentContainer}
        style={styles.flatListStyles}
        keyExtractor={(item, index) => item.email + `-` + index}
        renderItem={renderItem}
        automaticallyAdjustContentInsets={false}
        onEndReached={onNextPage}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            onRefresh={onPullToRefresh}
            refreshing={isRefreshing}
            tintColor={color.primaryColor}
          />
        }
      />
    </BaseLayout>
  );
};
export default React.memo(HomeScreen);
