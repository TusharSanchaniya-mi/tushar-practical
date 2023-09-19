import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type loginData = {
  email: string;
  password: string;
  isLoggedIn?: boolean;
  errorMessage?: string;
};

const initialState: loginData = {
  email: '',
  errorMessage: undefined,
  isLoggedIn: false,
  password: '',
};

const userCred = {
  email: 'reactnative@jetdevs.com',
  Password: 'jetdevs@123',
};

export const authUserSlice = createSlice({
  initialState,
  name: 'authUser',
  reducers: {
    clearCredentials: () => initialState,
    validateCredentials: (state, { payload }: PayloadAction<loginData>) => {
      if (
        payload.email === userCred.email &&
        payload.password === userCred.Password
      ) {
        state.isLoggedIn = true;
        state.errorMessage = undefined;
      } else {
        state.isLoggedIn = false;
        state.errorMessage = 'Invalid credentials';
      }
    },
  },
});

export const {
  actions: { clearCredentials, validateCredentials },
  name: authentication,
  reducer: authUser,
} = authUserSlice;
