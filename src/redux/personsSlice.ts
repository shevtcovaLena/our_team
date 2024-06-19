import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './thunkActions';
import { PersonsType } from '../types/types';

export type SliceState = {
  users: PersonsType;
  isLoading: boolean;
};

const initialState: SliceState = {
  users: [],
  isLoading: true,
};

const personsSlice = createSlice({
  name: 'personsSlice',
  initialState,
  reducers: {
    likeaction(state, { payload }) {
      const user = state.users.find((user) => user.id === payload);
      if (user) {
        user.like = !user.like;
      }
      const likes: Array<{ id: number; like: boolean }> = state.users.map((el) => ({
        id: el.id,
        like: el.like ?? false,
      }));
      sessionStorage.setItem('likes', JSON.stringify(likes));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      if (payload) {
        let likes: Array<{ id: number; like: boolean }> = [];
        const likestr: string | null = sessionStorage.getItem('likes');
        if (likestr) {
          likes = JSON.parse(likestr);
        }
        state.users = payload.map((user) => {
          const like = likes.find((lk) => lk.id === user.id);
          if (like) {
            return { ...user, ...like };
          }
          return { ...user, like: false };
        });
        state.isLoading = false;
      }
    });
  },
});

export default personsSlice.reducer;
export const { likeaction } = personsSlice.actions;
