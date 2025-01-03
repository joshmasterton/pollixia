import { useEffect } from 'react';
import { Poll } from '../comps/Poll.comp';
import { useAppDispatch, useAppSelector } from '../store';
import { Nav } from '../comps/Nav.comp';
import { Side } from '../comps/Side.comp';
import {
  clearPoll,
  getPoll,
  setPollsPage,
} from '../features/pollSlice.feature';
import { Loading } from '../utilities/Loading.utilities';
import { useLocation } from 'react-router-dom';
import { Footer } from '../comps/Footer.comp';

export const PollPage = () => {
  const dispatch = useAppDispatch();
  const { poll, pollLoading } = useAppSelector((state) => state.poll);
  const { user } = useAppSelector((state) => state.user);
  const location = useLocation();
  const pid = location.pathname.split('/').pop();

  useEffect(() => {
    if (pid) {
      dispatch(setPollsPage(0));
      getPoll(dispatch, 0, user?.uid, pid, false);
    }

    return () => {
      dispatch(clearPoll());
    };
  }, [pid, user?.uid, dispatch]);

  return (
    <>
      <Nav type="return" />
      <Side />
      <div id="poll">
        <h2>{`Lets check out the poll!`}</h2>
        <main>
          {pollLoading ? <Loading /> : poll && <Poll poll={poll} isPie />}
        </main>
        <Footer />
      </div>
    </>
  );
};
