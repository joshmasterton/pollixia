import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userReducer from './features/userSlice.feature';
import pollReducer from './features/pollSlice.feature';
import themeReducer from './features/themeSlice.feature';

export const store = configureStore({
  reducer: {
    user: userReducer,
    poll: pollReducer,
    theme: themeReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
