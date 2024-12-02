import { NavLink } from 'react-router-dom';
import logo from '../assets/loopza.png';
import axios from 'axios';
import { API_URL } from '../utilities/Api.utilitities';
import { PollType } from '../types/slice.types';
import { useAppDispatch, useAppSelector } from '../store';
import { setPoll } from '../features/pollSlice.feature';
import { useEffect } from 'react';
import { Poll } from '../comps/Poll.comp';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { poll } = useAppSelector((state) => state.poll);

  const getRandomPoll = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/getPoll?fetchSingle=${true}`,
      );

      const poll: PollType = response.data;
      dispatch(setPoll(poll));
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  };

  useEffect(() => {
    getRandomPoll();
  }, []);

  return (
    <>
      <div id="home">
        <img className="logo" alt="logo" src={logo} />
        <header>
          <h1>Vote. Poll. Answer.</h1>
          <div>
            Let`s find out what people think, Vote or make a poll to find out!
          </div>
        </header>
        <main>
          <NavLink to="/polls" className="primary">
            <div>Get started</div>
          </NavLink>
        </main>
        <footer>
          <div>
            <h2>Your polls, your way.</h2>
            <div>Quickly craft engaging polls tailored to your needs</div>
          </div>
          <div>
            <h2>Everyone has a voice</h2>
            <div>
              Explore results with real-time analytics and make data-driven
              choices confidently
            </div>
            {poll && <Poll poll={poll} />}
          </div>
          <div>
            <h2>Decisions made easy</h2>
            <div>Connect with others through meaningful insights</div>
          </div>
        </footer>
      </div>
    </>
  );
};
