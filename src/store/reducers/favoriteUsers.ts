import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FavoritesList } from '@src/services';

type FavoriteUserData = {
  favorites: FavoritesList[];
};

const initialState: FavoriteUserData = {
  favorites: [],
};

export const favoriteUsersSlice = createSlice({
  initialState,
  name: 'favoriteUsers',
  reducers: {
    clearFavorites: () => initialState,
    removeFavoriteUser: (
      state,
      { payload }: PayloadAction<FavoritesList[] | []>
    ) => {
      state.favorites = payload;
    },
    setFavoriteUser: (
      state,
      { payload }: PayloadAction<FavoritesList[] | []>
    ) => {
      state.favorites = payload;
    },
  },
});

export const {
  actions: { clearFavorites, removeFavoriteUser, setFavoriteUser },
  name: favoritesList,
  reducer: favoriteUsers,
} = favoriteUsersSlice;
