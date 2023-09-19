import React from 'react';
import { FlatList, View } from 'react-native';

import { Text } from '@app/blueprints';

import { BaseLayout, Header } from '@src/components';
import { UserList } from '@src/services';

import useFavorite from './useFavorite';
import { FavoriteView } from './views';

const FavoriteScreen = () => {
  const { contents, favoriteUsersList, handleUnFavorite, styles } =
    useFavorite();

  const renderItem = ({ item }: { item: UserList }) => {
    return <FavoriteView item={item} unFavoriteHandle={handleUnFavorite} />;
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text preset="h2" style={styles.noFavoritesText}>
        {contents('favorites.noFavorites')}
      </Text>
    </View>
  );

  return (
    <BaseLayout>
      <Header />
      <View style={styles.bodyContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favoriteUsersList}
          contentContainerStyle={styles.contentContainer}
          style={styles.flatListStyles}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>
    </BaseLayout>
  );
};

export default React.memo(FavoriteScreen);
