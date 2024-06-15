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

const postSlice = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
    multiply(state) {
      state.count *= state.count;
    },
    divide(state) {
      state.count /= state.count;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.posts = payload; // payload это response.data из thunk
      state.isLoading = false;
    });
    builder.addCase(fetchAddUser.fulfilled, (state, { payload }) => {
      state.posts.push(payload); // данные из inputs от fetchAddUser
    });
    builder.addCase(fetchDeleteUser.fulfilled, (state, { payload }) => {
      state.posts = state.posts.filter((el) => el.id !== payload);
    });
  },
});

export default postSlice.reducer;
export const { increment, decrement, multiply, divide } = postSlice.actions;
