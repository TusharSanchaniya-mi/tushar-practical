import { useCallback } from 'react';

import { showToast } from '@app/blueprints';
import { useSelector } from 'react-redux';

import { contents, useAppContext } from '@src/context';
import { FavoritesList } from '@src/services';
import { getFavoritesData, setFavoriteUser, useAppDispatch } from '@src/store';

import { favoriteStyles } from './Favorite.style';
import { loader } from '../../MainApp';

const useFavorite = () => {
  const { color, navigation, ...props } = useAppContext();
  const dispatch = useAppDispatch();

  const styles = favoriteStyles(color);

  const favoriteUsersList: FavoritesList[] = useSelector(getFavoritesData);

  const handleUnFavorite = useCallback(
    (item: FavoritesList) => {
      loader.current?.show();
      try {
        if (favoriteUsersList && favoriteUsersList.length > 0) {
          const favoritesUsersList = favoriteUsersList.filter(
            favItem => favItem.id !== item.id
          );
          dispatch(setFavoriteUser(favoritesUsersList));
        }
      } catch (error) {
        showToast(contents('common.errorMessage'), 'error');
      } finally {
        loader.current?.hide();
      }
    },
    [dispatch, favoriteUsersList]
  );
  return {
    ...props,
    contents,
    favoriteUsersList,
    handleUnFavorite,
    navigation,
    styles,
  };
};

export default useFavorite;
