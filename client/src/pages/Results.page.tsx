import { useAppDispatch, useAppSelector } from '../store';
import {
  clearPolls,
  getPolls,
  setPollsPage,
} from '../features/pollSlice.feature';
import { useEffect } from 'react';
import { Poll } from '../comps/Poll.comp';
import { Nav } from '../comps/Nav.comp';
import { Side } from '../comps/Side.comp';
import { Loading } from '../utilities/Loading.utilities';
import { Footer } from '../comps/Footer.comp';
import { NavLink } from 'react-router-dom';
import { BsFire } from 'react-icons/bs';
import { BiNews, BiPoll } from 'react-icons/bi';
import { Pagination } from '../comps/Pagination.comp';

export const Results = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { polls, pollsLoading, pollsPage } = useAppSelector(
    (state) => state.poll,
  );

  useEffect(() => {
    dispatch(setPollsPage(0));
    getPolls(dispatch, 0, user?.uid, false, false);

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
              <button type="button" className="container start fit">
                <BiNews />
                <div>Latest</div>
              </button>
              <button type="button" className="container start fit">
                <BsFire />
                <div>Trending</div>
              </button>
              <button type="button" className="container start fit">
                <BiPoll />
                <div>All</div>
              </button>
            </header>
            {polls.map((poll) => (
              <Poll key={poll.pid} poll={poll} />
            ))}
            {polls.length === 1 && <div className="box" />}
            <Pagination page={pollsPage} isActive={false} />
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
            <Pagination page={pollsPage} isActive={false} />
            <Footer />
          </>
        )}
      </div>
    </>
  );
};
