import { createSlice } from '@reduxjs/toolkit';
import { PollType } from '../types/slice.types';

// Initial state
const initialState: {
  poll: PollType | undefined;
  polls: PollType[] | undefined;
} = {
  poll: undefined,
  polls: undefined,
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
    setPolls: (state, action) => {
      state.polls = action.payload;
    },
    clearPolls: (state) => {
      state.polls = undefined;
    },
  },
});

export const { setPoll, setPolls, clearPoll, clearPolls } = pollSlice.actions;
export default pollSlice.reducer;
