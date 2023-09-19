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

  /*
   * Get random user lists
   */
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

  /*
   * Clear random user lists after pull refresh
   */
  const clearUsers = useCallback(() => {
    currentPage.current = INITIAL_PAGE;
    shouldLoadMore.current = false;
    setUserLists([]);
  }, []);

  /*
   * Pull to refresh to get random user lists
   */
  const onPullToRefresh = useCallback(() => {
    setIsRefreshing(true);
    clearUsers();
    getUsers();
  }, [clearUsers, getUsers]);

  /*
   * pagination to get random user lists
   */
  const onNextPage = useCallback(() => {
    usersList.length > 0 && getUsers();
  }, [getUsers, usersList]);

  /*
   * Logout user to redirect login screen
   */
  const handleLogout = useCallback(() => {
    dispatch(clearCredentials());
  }, [dispatch]);

  /*
   * Remove user that are mark as favorite
   */
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

  /*
   * Mark user as favorite from list
   */
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

  /*
   * Check if user is marked as favorite or not from list
   */
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

  /*
   * Get initially random users list
   */
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
