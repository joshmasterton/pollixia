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
  pollsLoadingMore: boolean;
  poll: PollType | undefined;
  polls: PollType[] | undefined;
} = {
  pollPage: 0,
  pollsPage: 0,
  pollLoading: true,
  pollsLoading: true,
  pollsLoadingMore: false,
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
    setPollsLoadingMore: (state) => {
      state.pollsLoadingMore = true;
    },
    clearPollsLoadingMore: (state) => {
      state.pollsLoadingMore = false;
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
  setPollsLoadingMore,
  clearPoll,
  clearPolls,
  clearPollLoading,
  clearPollsLoading,
  clearPollsLoadingMore,
} = pollSlice.actions;
export default pollSlice.reducer;

export const getPoll = async (
  dispatch: Dispatch,
  page = 0,
  uid?: string,
  pid?: string,
  isActive = true,
  isLoading = true,
) => {
  try {
    if (isLoading) {
      dispatch(setPollLoading());
    }

    const response = await axios.get(
      `${API_URL}/getPoll?fetchSingle=${true}&uid=${uid}&page=${page}&isActive=${isActive}&pid=${pid}&page=${page}`,
    );

    const poll: PollType = response.data;

    if (poll) {
      dispatch(setPoll(poll));
    }

    return poll;
  } catch (error) {
    if (error instanceof AxiosError) {
      activatePopup(dispatch, error.response?.data.error, '');
    } else if (error instanceof Error) {
      activatePopup(dispatch, error.message, '');
    } else {
      activatePopup(dispatch, 'Error getting poll', '');
    }
  } finally {
    dispatch(clearPollLoading());
  }
};

export const getPolls = async (
  dispatch: Dispatch,
  page = 0,
  uid?: string,
  isActive = true,
  isUser = false,
  isLoading = true,
  search?: string,
) => {
  try {
    if (isLoading) {
      dispatch(setPollsLoading());
    } else {
      dispatch(setPollsLoadingMore());
    }

    if (page < 0) {
      page = 0;
    }

    const response = await axios.get(
      `${API_URL}/getPoll?fetchSingle=${false}&uid=${uid}&page=${page}&isActive=${isActive}&isUser=${isUser}${search ? `&search=${search}` : ''}`,
    );

    const polls: PollType[] = response.data;

    dispatch(setPolls(polls));
  } catch (error) {
    if (error instanceof AxiosError) {
      activatePopup(dispatch, error.response?.data.error, '');
    } else if (error instanceof Error) {
      activatePopup(dispatch, error.message, '');
    } else {
      activatePopup(dispatch, 'Error getting polls', '');
    }
  } finally {
    dispatch(clearPollsLoading());
    dispatch(clearPollsLoadingMore());
  }
};
