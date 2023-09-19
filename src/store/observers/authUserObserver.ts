import { RootState } from '../index';

export const isLoggedIn = (state: RootState) => state.authUser.isLoggedIn;

export const error = (state: RootState) => state.authUser.errorMessage;
