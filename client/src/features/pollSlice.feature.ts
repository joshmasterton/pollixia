import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { PollType } from '../types/slice.types';
import { API_URL } from '../utilities/Api.utilitities';
import axios, { AxiosError } from 'axios';
import { activatePopup } from './popupSlice.feature';

// Initial state
const initialState: {
  pollPage: number;
  pollsPage: number;
  pollLoading: boolean;
  pollsLoading: boolean;
  poll: PollType | undefined;
  polls: PollType[] | undefined;
} = {
  pollPage: 0,
  pollsPage: 0,
  pollLoading: true,
  pollsLoading: true,
  poll: undefined,
  polls: undefined,
};

// Reducers
const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    setPollPage: (state, action) => {
      state.pollPage = action.payload;
    },
    setPollsPage: (state, action) => {
      state.pollsPage = action.payload;
    },
    setPollLoading: (state) => {
      state.pollLoading = true;
    },
    clearPollLoading: (state) => {
      state.pollLoading = false;
    },
    setPollsLoading: (state) => {
      state.pollsLoading = true;
    },
    clearPollsLoading: (state) => {
      state.pollsLoading = false;
    },
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

export const {
  setPollPage,
  setPollsPage,
  setPoll,
  setPolls,
  setPollLoading,
  setPollsLoading,
  clearPoll,
  clearPolls,
  clearPollLoading,
  clearPollsLoading,
} = pollSlice.actions;
export default pollSlice.reducer;

export const getPoll = async (
  dispatch: Dispatch,
  page: number,
  uid?: string,
  pid?: number,
  incrementPage = false,
  isActive = true,
  isLoading = true,
) => {
  try {
    if (isLoading) {
      dispatch(setPollLoading());
    }

    const response = await axios.get(
      `${API_URL}/getPoll?fetchSingle=${true}&uid=${uid}&page=${page}&isActive=${isActive}&pid=${pid}`,
    );

    const poll: PollType = response.data;

    dispatch(setPoll(poll));
    if (incrementPage) {
      dispatch(setPollPage(page + 1));
    }

    return poll;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      activatePopup(dispatch, error.response?.data.error, '');
    } else if (error instanceof Error) {
      activatePopup(dispatch, error.message, '');
    } else {
      activatePopup(dispatch, 'Error signing in', '');
    }
  } finally {
    dispatch(clearPollLoading());
  }
};

export const getPolls = async (
  dispatch: Dispatch,
  page: number,
  uid?: string,
  incrementPage = false,
  isActive = true,
) => {
  try {
    dispatch(setPollsLoading());
    const response = await axios.get(
      `${API_URL}/getPoll?fetchSingle=${false}&uid=${uid}&page=${page}&isActive=${isActive}`,
    );

    const polls: PollType[] = response.data;
    dispatch(setPolls(polls));
    if (incrementPage) {
      dispatch(setPollsPage(page + 1));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      activatePopup(dispatch, error.response?.data.error, '');
    } else if (error instanceof Error) {
      activatePopup(dispatch, error.message, '');
    } else {
      activatePopup(dispatch, 'Error signing in', '');
    }
  } finally {
    dispatch(clearPollsLoading());
  }
};
