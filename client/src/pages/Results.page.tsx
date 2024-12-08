import { useAppDispatch, useAppSelector } from '../store';
import { clearPolls, getPolls } from '../features/pollSlice.feature';
import { useEffect } from 'react';
import { Poll } from '../comps/Poll.comp';
import { Nav } from '../comps/Nav.comp';
import { Side } from '../comps/Side.comp';
import { Loading } from '../utilities/Loading.utilities';
import { Footer } from '../comps/Footer.comp';
import { NavLink } from 'react-router-dom';
import { BsFire } from 'react-icons/bs';
import { BiNews, BiPoll } from 'react-icons/bi';

export const Results = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { polls, pollsLoading, pollsPage } = useAppSelector(
    (state) => state.poll,
  );

  useEffect(() => {
    getPolls(dispatch, pollsPage, user?.uid, false, false);

    return () => {
      dispatch(clearPolls());
    };
  }, [user]);

  return (
    <>
      <Nav type="main" />
      <Side />
      <div id="polls">
        <h2>Lets see the results!</h2>

        {pollsLoading ? (
          <Loading />
        ) : polls ? (
          <>
            <header>
              <button type="button" className="container start">
                <BiNews />
                <div>Latest</div>
              </button>
              <button type="button" className="container start">
                <BsFire />
                <div>Trending</div>
              </button>
              <button type="button" className="container start">
                <BiPoll />
                <div>All</div>
              </button>
            </header>
            {polls.map((poll) => (
              <Poll key={poll.pid} poll={poll} />
            ))}
            {polls.length === 1 && <div className="box" />}
            <Footer />
          </>
        ) : (
          <>
            <div className="box">
              <div>No results right now</div>
              <NavLink to="/create" className="primary">
                <div>Create a poll</div>
              </NavLink>
            </div>
            <Footer />
          </>
        )}
      </div>
    </>
  );
};
