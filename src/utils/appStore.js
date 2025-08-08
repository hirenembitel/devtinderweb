import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import feedReducer from './feedSlice.js';

const appStore = configureStore({
  reducer: { 
    user:userReducer,
    feeds:feedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default appStore;