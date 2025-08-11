import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import feedReducer from './feedSlice.js';
import profileReducer from './EditProfileSlice.js';
import connectionsReducer from './ConnectionSlice.jsx';
import requestReducer from './requestSlice.jsx';

const appStore = configureStore({
  reducer: { 
    user:userReducer,
    feeds:feedReducer,
    profile:profileReducer,
    connections:connectionsReducer,
    requests:requestReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default appStore;