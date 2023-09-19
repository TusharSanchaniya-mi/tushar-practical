import { RootState } from '../index';

export const getFavoritesData = (state: RootState) =>
  state.favoriteUsers.favorites;
