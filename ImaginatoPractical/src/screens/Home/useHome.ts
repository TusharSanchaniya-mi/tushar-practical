import { useCallback, useEffect, useRef, useState } from 'react';

import { showToast } from '@app/blueprints';
import { useSelector } from 'react-redux';

import { contents, useAppContext } from '@src/context';
import { FavoritesList, UserList } from '@src/services';
import {
  clearCredentials,
  getFavoritesData,
  setFavoriteUser,
  useAppDispatch,
} from '@src/store';
import { isNetworkConnected } from '@src/utils';

import { homeStyles } from './Home.style';

const INITIAL_PAGE = 0;

const useHome = () => {
  const { color, services, ...props } = useAppContext();
  const styles = homeStyles(color);

  const isFetching = useRef<boolean>(false);
  const shouldLoadMore = useRef<boolean>(true);
  const currentPage = useRef<number>(0);

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(isFetching.current);
  const [usersList, setUserLists] = useState<UserList[]>([]);

  const dispatch = useAppDispatch();
  const myFavoriteUsers: UserList[] = useSelector(getFavoritesData);

  const getUsers = useCallback(
    async (isPullToRefresh: boolean = false) => {
      const isConnected = await isNetworkConnected();
      if (!isConnected) {
        showToast(contents('common.internetConnectionError'), 'error');
        return;
      }

      if (!isPullToRefresh && isFetching.current && shouldLoadMore.current)
        return;

      isFetching.current = true;
      setLoading(true);
      currentPage.current += 1;
      await services
        .getUserList({ page: currentPage.current })
        .then(res => {
          if (res) {
            if (res.length === 0) {
              shouldLoadMore.current = false;
            } else {
              shouldLoadMore.current = true;
              setUserLists(item => {
                return [...item, ...res];
              });
            }
          }
        })
        .catch(error => {
          if (error && error !== null && error.length > 0) {
            showToast(error, 'error');
          }
        })
        .finally(() => {
          isFetching.current = false;
          setLoading(false);
          setIsRefreshing(false);
        });
    },
    [services]
  );

  const clearUsers = useCallback(() => {
    currentPage.current = INITIAL_PAGE;
    shouldLoadMore.current = false;
    setUserLists([]);
  }, []);

  const onPullToRefresh = useCallback(() => {
    setIsRefreshing(true);
    clearUsers();
    getUsers();
  }, [clearUsers, getUsers]);

  const onNextPage = useCallback(() => {
    getUsers();
  }, [getUsers]);

  const handleLogout = useCallback(() => {
    dispatch(clearCredentials());
  }, [dispatch]);

  const handleUnFavorite = useCallback(
    (item: UserList) => {
      try {
        if (myFavoriteUsers && myFavoriteUsers.length > 0) {
          const filteredFavUsers = myFavoriteUsers.filter(
            favItem => favItem.id !== item.id
          );
          dispatch(setFavoriteUser(filteredFavUsers));
        }
      } catch (error) {
        showToast(contents('common.errorMessage'), 'error');
      }
    },
    [dispatch, myFavoriteUsers]
  );

  const handleFavorite = useCallback(
    (item: UserList) => {
      let favoriteUserLists: FavoritesList[] = [];
      try {
        if (myFavoriteUsers && myFavoriteUsers.length > 0) {
          favoriteUserLists = [...myFavoriteUsers, item];
        } else {
          favoriteUserLists = [item];
        }
        dispatch(setFavoriteUser(favoriteUserLists));
      } catch (error) {
        showToast(contents('common.errorMessage'), 'error');
      }
    },
    [dispatch, myFavoriteUsers]
  );

  const isFavorite = useCallback(
    (id: string): boolean => {
      return (
        myFavoriteUsers &&
        myFavoriteUsers.length > 0 &&
        myFavoriteUsers.some(favItem => favItem.id === id)
      );
    },
    [myFavoriteUsers]
  );

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return {
    ...props,
    color,
    handleFavorite,
    handleLogout,
    handleUnFavorite,
    isFavorite,
    isLoading,
    isRefreshing,
    onNextPage,
    onPullToRefresh,
    shouldLoadMore: shouldLoadMore.current,
    styles,
    usersList,
  };
};

export default useHome;
