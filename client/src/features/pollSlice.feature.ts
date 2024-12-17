import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { PollType } from '../types/slice.types';
import { API_URL } from '../utilities/Api.utilitities';
import axios, { AxiosError } from 'axios';
import { activatePopup } from './popupSlice.feature';

// Initial state
const initialState: {
  pollPage: number;
  pollsPage: number;
  activePollsPage: number;
  usersPollsPage: number;
  pollLoading: boolean;
  pollsLoading: boolean;
  pollsLoadingMore: boolean;
  activePollsLoading: boolean;
  activePollsLoadingMore: boolean;
  usersPollsLoading: boolean;
  usersPollsLoadingMore: boolean;
  poll: PollType | undefined;
  polls: PollType[] | undefined;
  activePolls: PollType[] | undefined;
  usersPolls: PollType[] | undefined;
} = {
  pollPage: 0,
  pollsPage: 0,
  activePollsPage: 0,
  usersPollsPage: 0,
  pollLoading: true,
  pollsLoading: true,
  pollsLoadingMore: false,
  activePollsLoading: true,
  activePollsLoadingMore: false,
  usersPollsLoading: true,
  usersPollsLoadingMore: false,
  poll: undefined,
  polls: undefined,
  activePolls: undefined,
  usersPolls: undefined,
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
    setActivePollsPage: (state, action) => {
      state.activePollsPage = action.payload;
    },
    setUsersPollsPage: (state, action) => {
      state.usersPollsPage = action.payload;
    },
    setPollLoading: (state) => {
      state.pollLoading = true;
    },
    clearPollLoading: (state) => {
      state.pollLoading = false;
    },
    setPollsLoading: (state, action) => {
      if (action.payload === 'active') {
        state.activePollsLoading = true;
      } else if (action.payload === 'users') {
        state.usersPollsLoading = true;
      } else {
        state.pollsLoading = true;
      }
    },
    clearPollsLoading: (state, action) => {
      if (action.payload === 'active') {
        state.activePollsLoading = false;
      } else if (action.payload === 'users') {
        state.usersPollsLoading = false;
      } else {
        state.pollsLoading = false;
      }
    },
    setPollsLoadingMore: (state, action) => {
      if (action.payload === 'active') {
        state.activePollsLoadingMore = true;
      } else if (action.payload === 'users') {
        state.usersPollsLoadingMore = true;
      } else {
        state.pollsLoadingMore = true;
      }
    },
    clearPollsLoadingMore: (state, action) => {
      if (action.payload === 'active') {
        state.activePollsLoadingMore = false;
      } else if (action.payload === 'users') {
        state.usersPollsLoadingMore = false;
      } else {
        state.pollsLoadingMore = false;
      }
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
      state.activePolls = undefined;
      state.usersPolls = undefined;
    },
    setActivePolls: (state, action) => {
      state.activePolls = action.payload;
    },
    clearActivePolls: (state) => {
      state.activePolls = undefined;
    },
    setUsersPolls: (state, action) => {
      state.usersPolls = action.payload;
    },
    clearUsersPolls: (state) => {
      state.usersPolls = undefined;
    },
  },
});

export const {
  setPollPage,
  setPollsPage,
  setActivePollsPage,
  setUsersPollsPage,
  setPoll,
  setPolls,
  setActivePolls,
  setUsersPolls,
  setPollLoading,
  setPollsLoading,
  setPollsLoadingMore,
  clearPoll,
  clearPolls,
  clearActivePolls,
  clearUsersPolls,
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
      console.log(error);
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
  incrementPage = false,
  isActive = true,
  isUser = false,
  isLoading = true,
  decrementPage = false,
) => {
  try {
    if (isLoading) {
      dispatch(setPollsLoading(isActive ? 'active' : isUser ? 'users' : ''));
    } else {
      dispatch(
        setPollsLoadingMore(isActive ? 'active' : isUser ? 'users' : ''),
      );
    }

    if (page < 0) {
      page = 0;
    }

    const response = await axios.get(
      `${API_URL}/getPoll?fetchSingle=${false}&uid=${uid}&page=${page}&isActive=${isActive}&isUser=${isUser}`,
    );

    const polls: PollType[] = response.data;

    if (polls) {
      if (incrementPage) {
        if (isUser) {
          dispatch(setUsersPollsPage(page));
        } else if (isActive) {
          dispatch(setActivePollsPage(page));
        } else {
          dispatch(setPollsPage(page));
        }
      } else if (decrementPage) {
        if (isUser) {
          dispatch(setUsersPollsPage(page));
        } else if (isActive) {
          dispatch(setActivePollsPage(page));
        } else {
          dispatch(setPollsPage(page));
        }
      }

      if (isUser) {
        dispatch(setUsersPolls(polls));
      } else if (isActive) {
        dispatch(setActivePolls(polls));
      } else {
        dispatch(setPolls(polls));
      }
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      activatePopup(dispatch, error.response?.data.error, '');
    } else if (error instanceof Error) {
      activatePopup(dispatch, error.message, '');
    } else {
      activatePopup(dispatch, 'Error getting polls', '');
    }
  } finally {
    dispatch(clearPollsLoading(isActive ? 'active' : isUser ? 'users' : ''));
    dispatch(
      clearPollsLoadingMore(isActive ? 'active' : isUser ? 'users' : ''),
    );
  }
};
