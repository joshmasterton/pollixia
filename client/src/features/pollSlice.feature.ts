import { createSlice } from '@reduxjs/toolkit';
import { Poll } from '../types/slice.types';

// Initial state
const initialState: {
  poll: Poll | undefined;
} = {
  poll: undefined,
};

// Reducers
const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    setPoll: (state, action) => {
      state.poll = action.payload;
    },
    clearPoll: (state) => {
      state.poll = undefined;
    },
  },
});

export const { setPoll, clearPoll } = pollSlice.actions;
export default pollSlice.reducer;
