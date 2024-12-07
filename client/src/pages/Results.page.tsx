import { useAppDispatch, useAppSelector } from '../store';
import { clearPolls, getPolls } from '../features/pollSlice.feature';
import { useEffect } from 'react';
import { Poll } from '../comps/Poll.comp';
import { Nav } from '../comps/Nav.comp';
import { Side } from '../comps/Side.comp';
import { Loading } from '../utilities/Loading.utilities';
import { Footer } from '../comps/Footer.comp';

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
        {pollsLoading ? (
          <Loading />
        ) : (
          polls && polls.map((poll) => <Poll key={poll.pid} poll={poll} />)
        )}
        <Footer />
      </div>
    </>
  );
};
