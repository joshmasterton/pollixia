import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/slice.types';

// Initial state
const initialState: {
  loading: boolean;
  user: User | undefined;
} = {
  loading: false,
  user: undefined,
};

// Reducers
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    clearLoading: (state) => {
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = undefined;
    },
  },
});

export const { setUser, clearUser, setLoading, clearLoading } =
  userSlice.actions;
export default userSlice.reducer;
