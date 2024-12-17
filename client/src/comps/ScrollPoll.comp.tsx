import { PollType } from '../types/slice.types';
import { Poll } from './Poll.comp';
import { Loading } from '../utilities/Loading.utilities';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  clearPolls,
  getPolls,
  setActivePollsPage,
  setPollsPage,
  setUsersPollsPage,
} from '../features/pollSlice.feature';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

export const ScrollPage = ({
  polls,
  loading,
  title,
  type,
}: {
  polls: PollType[] | undefined;
  loading: boolean;
  title: string;
  type: 'users' | 'all' | 'active';
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const {
    pollsPage,
    activePollsPage,
    usersPollsPage,
    pollsLoadingMore,
    activePollsLoadingMore,
    usersPollsLoadingMore,
  } = useAppSelector((state) => state.poll);

  useEffect(() => {
    if (type === 'active') {
      dispatch(setActivePollsPage(0));
      getPolls(dispatch, 0, user?.uid, false, true);
    }

    if (type === 'all') {
      dispatch(setPollsPage(0));
      getPolls(dispatch, 0, user?.uid, false, false);
    }

    if (type === 'users') {
      dispatch(setUsersPollsPage(0));
      getPolls(dispatch, 0, user?.uid, false, false, true);
    }

    return () => {
      dispatch(clearPolls());
    };
  }, [user]);

  const getMore = async () => {
    if (type === 'active') {
      getPolls(
        dispatch,
        activePollsPage + 1,
        user?.uid,
        true,
        true,
        false,
        false,
      );
    } else if (type === 'all') {
      getPolls(dispatch, pollsPage + 1, user?.uid, true, false, false, false);
    } else if (type === 'users') {
      getPolls(
        dispatch,
        usersPollsPage + 1,
        user?.uid,
        true,
        false,
        true,
        false,
      );
    }
  };

  const getLess = async () => {
    if (type === 'active') {
      getPolls(
        dispatch,
        activePollsPage - 1,
        user?.uid,
        false,
        true,
        false,
        false,
        true,
      );
    } else if (type === 'all') {
      getPolls(
        dispatch,
        pollsPage - 1,
        user?.uid,
        false,
        false,
        false,
        false,
        true,
      );
    } else if (type === 'users') {
      getPolls(
        dispatch,
        usersPollsPage - 1,
        user?.uid,
        false,
        false,
        true,
        false,
        true,
      );
    }
  };

  return loading ? (
    <Loading />
  ) : polls ? (
    <div className="scrollPoll">
      <h3>{title}</h3>
      <div>
        {type === 'active' && activePollsPage > 0 && (
          <div className="more">
            <button
              type="button"
              disabled={
                pollsLoadingMore ||
                activePollsLoadingMore ||
                usersPollsLoadingMore
              }
              className="container"
              onClick={async () => await getLess()}
            >
              {type === 'active' && activePollsLoadingMore ? (
                <Loading isSmall />
              ) : (
                <LuChevronLeft />
              )}
            </button>
          </div>
        )}
        {type === 'all' && pollsPage > 0 && (
          <div className="more">
            <button
              type="button"
              disabled={
                pollsLoadingMore ||
                activePollsLoadingMore ||
                usersPollsLoadingMore
              }
              className="container"
              onClick={async () => await getLess()}
            >
              {type === 'all' && pollsLoadingMore ? (
                <Loading isSmall />
              ) : (
                <LuChevronLeft />
              )}
            </button>
          </div>
        )}
        {type === 'users' && usersPollsPage > 0 && (
          <div className="more">
            <button
              type="button"
              disabled={
                pollsLoadingMore ||
                activePollsLoadingMore ||
                usersPollsLoadingMore
              }
              className="container"
              onClick={async () => await getLess()}
            >
              {type === 'users' && usersPollsLoadingMore ? (
                <Loading isSmall />
              ) : (
                <LuChevronLeft />
              )}
            </button>
          </div>
        )}
        {polls.map((poll) => (
          <Poll key={poll.pid} poll={poll} />
        ))}
        {polls.length === 10 && (
          <div className="more">
            <button
              type="button"
              className="container"
              disabled={
                pollsLoadingMore ||
                activePollsLoadingMore ||
                usersPollsLoadingMore
              }
              onClick={async () => await getMore()}
            >
              {type === 'active' && activePollsLoadingMore ? (
                <Loading isSmall />
              ) : type === 'users' && usersPollsLoadingMore ? (
                <Loading isSmall />
              ) : type === 'all' && pollsLoadingMore ? (
                <Loading isSmall />
              ) : (
                <LuChevronRight />
              )}
            </button>
          </div>
        )}
        {polls.length === 10 && (
          <div className="more">
            <button
              type="button"
              className="container"
              disabled={
                pollsLoadingMore ||
                activePollsLoadingMore ||
                usersPollsLoadingMore
              }
              onClick={async () => await getMore()}
            >
              {type === 'active' && activePollsLoadingMore ? (
                <Loading isSmall />
              ) : type === 'users' && usersPollsLoadingMore ? (
                <Loading isSmall />
              ) : type === 'all' && pollsLoadingMore ? (
                <Loading isSmall />
              ) : (
                <LuChevronRight />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};
