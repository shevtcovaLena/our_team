import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './thunkActions';
import { PersonsType } from '../types/types';

export type SliceState = {
  users: PersonsType;
  isLoading: boolean;
  isAuth: boolean;
};

const initialState: SliceState = {
  users: [],
  isLoading: true,
  isAuth: false,
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
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      if (payload) {
        const likes: Array<{ id: number; like: boolean }> = JSON.parse(sessionStorage.getItem('likes') || '[]');
        const likesMap = new Map<number, boolean>(likes.map(like => [like.id, like.like]));
    
        state.users = payload.map(user => ({
          ...user,
          like: likesMap.get(user.id) ?? false,
        }));
    
        state.isLoading = false;
      }
    });
  },
});

export default personsSlice.reducer;
export const { likeaction, login, logout } = personsSlice.actions;
