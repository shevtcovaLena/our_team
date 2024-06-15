import type { ConfigureStoreOptions} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import type { SliceState } from './personsSlice';
import personsSlice from './personsSlice';
import userSlice from './userSlice';

type StoreType = {
  personsSlice: SliceState;
};

const storeOptions: ConfigureStoreOptions<StoreType> = {
  reducer: {
    userSlice
    personsSlice,
  },
};

export const store = configureStore(storeOptions);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
