import React from 'react';
import { getPolls, setPollsPage } from '../features/pollSlice.feature';
import { useAppDispatch, useAppSelector } from '../store';

export const Pagination = ({
  page,
  currentPollType,
}: {
  page: number;
  currentPollType: 'Active' | 'Users' | 'All';
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handlePageSwitch = async (
    newPage: number,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.currentTarget.blur();
    if (currentPollType === 'Active') {
      getPolls(dispatch, newPage, user?.uid, true, false);
    } else if (currentPollType === 'Users') {
      getPolls(dispatch, newPage, user?.uid, false, true);
    } else {
      getPolls(dispatch, newPage, user?.uid, false, false);
    }

    dispatch(setPollsPage(newPage));
  };

  return (
    <div id="pagination">
      {page - 2 >= 0 && (
        <>
          <button
            type="button"
            className="container"
            onClick={(e) => handlePageSwitch(0, e)}
          >
            <div>0</div>
          </button>
          {!(page - 2 === 0) && (
            <button
              type="button"
              className="container"
              onClick={(e) => handlePageSwitch(page - 2, e)}
            >
              <div>{page - 2}</div>
            </button>
          )}
        </>
      )}
      {page - 1 >= 0 && (
        <button
          type="button"
          className="container"
          onClick={(e) => handlePageSwitch(page - 1, e)}
        >
          <div>{page - 1}</div>
        </button>
      )}
      <button
        type="button"
        className="active"
        onClick={(e) => handlePageSwitch(page, e)}
      >
        <div>{page}</div>
      </button>
      <button
        type="button"
        className="container"
        onClick={(e) => handlePageSwitch(page + 1, e)}
      >
        <div>{page + 1}</div>
      </button>
      <button
        type="button"
        className="container"
        onClick={(e) => handlePageSwitch(page + 2, e)}
      >
        <div>{page + 2}</div>
      </button>
    </div>
  );
};
