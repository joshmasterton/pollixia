import { useEffect } from 'react';
import { Poll } from '../comps/Poll.comp';
import { useAppDispatch, useAppSelector } from '../store';
import { Nav } from '../comps/Nav.comp';
import { Side } from '../comps/Side.comp';
import { clearPoll, getPoll } from '../features/pollSlice.feature';
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
      getPoll(dispatch, 0, user?.uid, parseInt(pid), false, false);
    }

    return () => {
      dispatch(clearPoll());
    };
  }, [pid]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (pid) {
        await getPoll(
          dispatch,
          0,
          user?.uid,
          parseInt(pid),
          false,
          false,
          false,
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Nav type="main" />
      <Side />
      <div id="poll">
        <h2>{`Lets check out the poll!`}</h2>
        <main>
          {pollLoading ? <Loading /> : poll && <Poll poll={poll} isPoll />}
        </main>
        <Footer />
      </div>
    </>
  );
};
