import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/slice.types';

// Initial state
const initialState: {
  user: User | undefined;
} = {
  user: undefined,
};

// Reducers
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = undefined;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
