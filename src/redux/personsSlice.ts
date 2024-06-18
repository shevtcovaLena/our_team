import { createSlice } from '@reduxjs/toolkit';
import { fetchLikes, fetchUsers } from './thunkActions';
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
    },
    // setlikes(state, { payload }) {
    //   const user = state.users.find((user) => user.id === payload.id);
    //   if (user) {
    //     user.like = payload.id;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      if (payload) {
        state.users = payload.map((el) => ({ ...el, like: false }));
        state.isLoading = false;
      }
    });
    builder.addCase(fetchLikes.fulfilled, (state, { payload }) => {
      if (payload) {
        state.users = state.users.map((el) => {
            const like = payload.find((lk: { id: number, like: boolean }) => lk.id === el.id);
            return {...el, ...like}
          });
        state.isLoading = false;
      }
    });
  },
});

export default personsSlice.reducer;
export const { likeaction,
  //  setlikes
   } = personsSlice.actions;
