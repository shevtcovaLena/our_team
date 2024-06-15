import { createSlice } from '@reduxjs/toolkit';
import { fetchRegUser } from './thunkUserActions';

export interface IUser {
  email: string;
  password: string;
}

export type UserStateType = {
  logStatus: boolean;
  msg: string;
};

export const initialUser: IUser = {
  email: '',
  password: '',
};

const initialState: UserStateType = {
  logStatus: false,
  msg: '',
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRegUser.fulfilled, (state, { payload }) => {
      if (payload.error) {
        state.msg = payload.error;
      } else {
        state.logStatus = true;
        state.msg = 'Регистрация прошла успешно';
      }
    });
  },
  reducers: {
    login(state) {
      state.logStatus = false;
    },
    logout(state) {
      state.logStatus = false;
    },
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
