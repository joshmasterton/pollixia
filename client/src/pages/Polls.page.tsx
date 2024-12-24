import { useAppDispatch, useAppSelector } from '../store';
import { Nav } from '../comps/Nav.comp';
import { Side } from '../comps/Side.comp';
import { Footer } from '../comps/Footer.comp';
import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  clearPolls,
  getPolls,
  setPollsPage,
} from '../features/pollSlice.feature';
import { Loading } from '../utilities/Loading.utilities';
import { Poll } from '../comps/Poll.comp';
import { Pagination } from '../comps/Pagination.comp';

export const Polls = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [currentPollType, setCurrentPollType] = useState<
    'Users' | 'All' | 'Active'
  >('Users');
  const [initalLoading, setInitialLoading] = useState(true);
  const { polls, pollsLoading, pollsPage } = useAppSelector(
    (state) => state.poll,
  );

  useEffect(() => {
    dispatch(setPollsPage(0));

    if (currentPollType === 'Active') {
      getPolls(dispatch, 0, user?.uid, true, false);
    } else if (currentPollType === 'Users') {
      getPolls(dispatch, 0, user?.uid, false, true);
    } else {
      getPolls(dispatch, 0, user?.uid, false, false);
    }

    setInitialLoading(false);

    return () => {
      dispatch(clearPolls());
    };
  }, [user, currentPollType]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [polls]);

  const changeCurrentPollType = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: 'Users' | 'Active' | 'All',
  ) => {
    e.currentTarget.blur();
    setCurrentPollType(type);
  };

  return (
    <>
      <Nav type="main" />
      <Side />
      <div id="polls">
        <h2>Lets get started voting!</h2>
        <header>
          <button
            type="button"
            onClick={(e) => changeCurrentPollType(e, 'Users')}
            className={`${currentPollType === 'Users' ? 'primary' : 'container'}`}
          >
            <div>Your polls</div>
          </button>
          <button
            type="button"
            onClick={(e) => changeCurrentPollType(e, 'Active')}
            className={`${currentPollType === 'Active' ? 'primary' : 'container'}`}
          >
            <div>Live polls</div>
          </button>
          <button
            type="button"
            onClick={(e) => changeCurrentPollType(e, 'All')}
            className={`${currentPollType === 'All' ? 'primary' : 'container'}`}
          >
            <div>All polls</div>
          </button>
        </header>
        {pollsLoading || initalLoading ? (
          <Loading />
        ) : polls && !pollsLoading ? (
          <main>
            {polls.map((poll) => (
              <Poll poll={poll} key={poll.pid} />
            ))}
          </main>
        ) : (
          <div className="box">
            <h3>{`${!user && currentPollType === 'Users' ? 'Login to see your polls' : 'No polls right now'}`}</h3>
            {!user && currentPollType === 'Users' ? (
              <NavLink to="/login" className="primary">
                <div>Login</div>
              </NavLink>
            ) : (
              <NavLink to="/create" className="primary">
                <div>Create a poll</div>
              </NavLink>
            )}
          </div>
        )}
        <Pagination page={pollsPage} currentPollType={currentPollType} />
        <Footer />
      </div>
    </>
  );
};
