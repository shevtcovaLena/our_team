import { createSlice } from '@reduxjs/toolkit';
import { fetchAddUser, fetchDeleteUser, fetchUsers } from './thunkActions';
import { IUser, UsersType } from '../types/types';

export type SliceState = {
  count: number;
  posts: UsersType; //Array<IUser>
  isLoading: boolean;
};

const initialState: SliceState = {
  count: 0,
  posts: [],
  isLoading: true,
};

const personsSlice = createSlice({
  name: 'personsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.posts = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAddUser.fulfilled, (state, { payload }) => {
      state.posts.push(payload);
    });
    builder.addCase(fetchDeleteUser.fulfilled, (state, { payload }) => {
      state.posts = state.posts.filter((el) => el.id !== payload);
    });
  },
});

export default personsSlice.reducer;
export const { increment, decrement, multiply, divide } = personsSlice.actions;
