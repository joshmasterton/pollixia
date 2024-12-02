import axios from 'axios';
import { PollType } from '../types/slice.types';
import { useAppDispatch, useAppSelector } from '../store';
import { setPoll, setPolls } from '../features/pollSlice.feature';
import { useEffect } from 'react';
import { API_URL } from '../utilities/Api.utilitities';
import { Poll } from '../comps/Poll.comp';
import { Nav } from '../comps/Nav.comp';
import { Side } from '../comps/Side.comp';

export const Polls = () => {
  const dispatch = useAppDispatch();
  const { polls } = useAppSelector((state) => state.poll);
  const getPolls = async (fetchSingle: boolean) => {
    try {
      if (fetchSingle) {
        const response = await axios.get(
          `${API_URL}/getPoll?fetchSingle=${true}`,
        );

        const poll: PollType = response.data;
        dispatch(setPoll(poll));
      } else {
        const response = await axios.get(
          `${API_URL}/getPoll?fetchSingle=${false}`,
        );

        const polls: PollType[] = response.data;
        dispatch(setPolls(polls));
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  };

  useEffect(() => {
    getPolls(false);
  }, []);

  return (
    <>
      <Nav type="main" />
      <Side />
      <div id="polls">
        {polls && polls.map((poll) => <Poll key={poll.pid} poll={poll} />)}
      </div>
    </>
  );
};
