import { useEffect } from 'react';
import { Poll } from '../comps/Poll.comp';
import { useAppDispatch, useAppSelector } from '../store';
import { Nav } from '../comps/Nav.comp';
import { Side } from '../comps/Side.comp';
import { getPoll } from '../features/pollSlice.feature';
import { Loading } from '../utilities/Loading.utilities';
import { useLocation } from 'react-router-dom';

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
  }, [pid]);

  return (
    <>
      <Nav type="main" />
      <Side />
      {pollLoading ? (
        <Loading />
      ) : (
        <div id="poll">{poll && <Poll poll={poll} />}</div>
      )}
    </>
  );
};
