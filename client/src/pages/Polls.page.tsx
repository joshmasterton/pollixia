import { useAppDispatch, useAppSelector } from '../store';
import { Nav } from '../comps/Nav.comp';
import { Side, SideAd } from '../comps/Side.comp';
import { Footer } from '../comps/Footer.comp';
import { NavLink, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  clearPolls,
  getPolls,
  setPollsPage,
} from '../features/pollSlice.feature';
import { Loading } from '../utilities/Loading.utilities';
import { Poll } from '../comps/Poll.comp';
import { Pagination } from '../comps/Pagination.comp';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BiSearch } from 'react-icons/bi';
import { SearchFormData } from '../types/slice.types';

// Validation schema for searching for a poll
const createSchema = yup.object().shape({
  search: yup.string().optional(),
});

export const Polls = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.user);
  const [currentPollType, setCurrentPollType] = useState<
    'Users' | 'All' | 'Active'
  >('Users');
  const [initalLoading, setInitialLoading] = useState(true);
  const { polls, pollsLoading, pollsPage } = useAppSelector(
    (state) => state.poll,
  );

  const { register, handleSubmit, watch } = useForm<SearchFormData>({
    mode: 'onChange',
    resolver: yupResolver(createSchema),
  });

  const search = watch('search');

  useEffect(() => {
    dispatch(setPollsPage(0));

    if (currentPollType === 'Active') {
      getPolls(dispatch, 0, user?.uid, true, false, true, search);
    } else if (currentPollType === 'Users') {
      getPolls(dispatch, 0, user?.uid, false, true, true, search);
    } else {
      getPolls(dispatch, 0, user?.uid, false, false, true, search);
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

  const searchForPoll = async (data: SearchFormData) => {
    dispatch(setPollsPage(0));

    if (currentPollType === 'Active') {
      await getPolls(dispatch, 0, user?.uid, true, false, true, data.search);
    } else if (currentPollType === 'Users') {
      await getPolls(dispatch, 0, user?.uid, false, true, true, data.search);
    } else {
      await getPolls(dispatch, 0, user?.uid, false, false, true, data.search);
    }
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
            className={`${currentPollType === 'Users' ? 'primary' : 'container'} full`}
          >
            <div>Own</div>
          </button>
          <button
            type="button"
            onClick={(e) => changeCurrentPollType(e, 'Active')}
            className={`${currentPollType === 'Active' ? 'primary' : 'container'} full`}
          >
            <div>Live</div>
          </button>
          <button
            type="button"
            onClick={(e) => changeCurrentPollType(e, 'All')}
            className={`${currentPollType === 'All' ? 'primary' : 'container'} full`}
          >
            <div>All</div>
          </button>
        </header>
        <form method="get" onSubmit={handleSubmit(searchForPoll)}>
          <label htmlFor="search" className="container">
            <input
              max={200}
              id="search"
              {...register('search')}
              placeholder="Type poll question to search..."
            />
          </label>
          <button type="submit" className="primary">
            <BiSearch />
          </button>
        </form>
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
              <NavLink
                to="/create"
                state={{ from: location }}
                className="primary"
              >
                <div>Create a poll</div>
              </NavLink>
            )}
          </div>
        )}
        <Pagination
          page={pollsPage}
          currentPollType={currentPollType}
          search={search}
        />
        <Footer />
      </div>
      <SideAd />
    </>
  );
};
