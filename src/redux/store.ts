import { ConfigureStoreOptions, configureStore } from '@reduxjs/toolkit';
import postSlice, { SliceState } from './postSlice';

type StoreType = {
  postSlice: SliceState;
};

const storeOptions: ConfigureStoreOptions<StoreType> = {
  reducer: {
    postSlice,
  },
};

export const store = configureStore(storeOptions);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
