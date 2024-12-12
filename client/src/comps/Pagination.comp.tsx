import { getPolls, setPollsPage } from '../features/pollSlice.feature';
import { useAppDispatch, useAppSelector } from '../store';

export const Pagination = ({
  page,
  isActive,
}: {
  page: number;
  isActive: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handlePageSwitch = async (newPage: number) => {
    dispatch(setPollsPage(newPage));
    await getPolls(dispatch, newPage, user?.uid, false, isActive);
  };

  return (
    <div id="pagination">
      {page - 2 >= 0 && (
        <>
          <button
            type="button"
            className={`outline`}
            onClick={() => handlePageSwitch(0)}
          >
            <div>0</div>
          </button>
          {!(page - 2 === 0) && (
            <button
              type="button"
              className={`outline`}
              onClick={() => handlePageSwitch(page - 2)}
            >
              <div>{page - 2}</div>
            </button>
          )}
        </>
      )}
      {page - 1 >= 0 && (
        <button
          type="button"
          className={`outline`}
          onClick={() => handlePageSwitch(page - 1)}
        >
          <div>{page - 1}</div>
        </button>
      )}
      <button
        type="button"
        className={`outline active`}
        onClick={() => handlePageSwitch(page)}
      >
        <div>{page}</div>
      </button>
      <button
        type="button"
        className={`outline`}
        onClick={() => handlePageSwitch(page + 1)}
      >
        <div>{page + 1}</div>
      </button>
      <button
        type="button"
        className={`outline`}
        onClick={() => handlePageSwitch(page + 2)}
      >
        <div>{page + 2}</div>
      </button>
    </div>
  );
};
