import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bookClubReducer from './slices/bookClubSlice';
import bookReducer from './slices/bookSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bookClubs: bookClubReducer,
    books: bookReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;