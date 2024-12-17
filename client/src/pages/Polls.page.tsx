import { useAppSelector } from '../store';
import { Nav } from '../comps/Nav.comp';
import { Side } from '../comps/Side.comp';
import { Footer } from '../comps/Footer.comp';
import { ScrollPage } from '../comps/ScrollPoll.comp';
import { NavLink } from 'react-router-dom';

export const Polls = () => {
  const {
    polls,
    activePolls,
    usersPolls,
    pollsLoading,
    activePollsLoading,
    usersPollsLoading,
  } = useAppSelector((state) => state.poll);

  return (
    <>
      <Nav type="main" />
      <Side />
      <div id="polls">
        <h2>Lets get started voting!</h2>
        <ScrollPage
          polls={activePolls}
          loading={activePollsLoading}
          title="Active polls"
          type="active"
        />
        <ScrollPage
          polls={usersPolls}
          loading={usersPollsLoading}
          title="Users polls"
          type="users"
        />
        <ScrollPage
          polls={polls}
          loading={pollsLoading}
          title="All polls"
          type="all"
        />
        {!(pollsLoading || activePollsLoading || usersPollsLoading) &&
          !polls?.length &&
          !usersPolls?.length &&
          !activePolls?.length && (
            <div className="box">
              <h3>No polls right now</h3>
              <NavLink to="/create" className="primary">
                <div>Create a poll</div>
              </NavLink>
            </div>
          )}
        <Footer />
      </div>
    </>
  );
};
