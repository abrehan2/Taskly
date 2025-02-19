// Imports:
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { TableSlice } from './reducers/table';

const rootReducer = combineReducers({
  // 1) Table Slice:
  [TableSlice.name]: TableSlice.reducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: storageSession,
    whitelist: [TableSlice.name],
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
