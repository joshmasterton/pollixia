import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { getPoll } from '../features/pollSlice.feature';
import { useEffect } from 'react';
import { Poll } from '../comps/Poll.comp';
import logo from '../assets/loopza.png';
import { Loading } from '../utilities/Loading.utilities';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { poll, pollLoading, pollPage } = useAppSelector((state) => state.poll);

  useEffect(() => {
    getPoll(dispatch, pollPage, user?.uid);
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
            {pollLoading ? <Loading /> : poll && <Poll poll={poll} />}
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
