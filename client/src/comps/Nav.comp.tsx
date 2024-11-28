import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { clearUser } from '../features/userSlice.feature';
import { CiMenuFries } from 'react-icons/ci';
import { BiLogIn, BiLogOut, BiPoll } from 'react-icons/bi';
import { LuVote } from 'react-icons/lu';
import { PiTrolleySuitcase } from 'react-icons/pi';
import logo from '../assets/loopza.png';

export const Nav = ({ type }: { type: 'home' | 'main' }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();
  const title = currentPage
    ? currentPage?.charAt(0).toUpperCase() + currentPage?.slice(1)
    : '';
  const { user } = useAppSelector((state) => state.user);
  const [isMenu, setIsMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  };

  return (
    <nav className={`${type} ${isMenu ? `active` : ``}`}>
      <div>
        <span />
        <header>
          {user ? (
            <div className="img">
              <img alt="user" src={user.photoURL} className="full end blur" />
            </div>
          ) : (
            <div className="img">
              <img alt="logo" src={logo} className="full end blur" />
            </div>
          )}
          <h4 className="padding">{title}</h4>
        </header>
        <main>
          <NavLink to="/polls" className="end">
            <div>Polls</div>
          </NavLink>
          <NavLink to="/create" className="end">
            <div>Create</div>
          </NavLink>
          <NavLink to="/vote" className="end">
            <div>Vote</div>
          </NavLink>
          <NavLink to="/results" className="end">
            <div>Results</div>
          </NavLink>
        </main>
        <div>
          <div>
            {user ? (
              <button
                type="button"
                className="full end logout"
                onClick={async () => await handleLogout()}
              >
                <div>Logout</div>
              </button>
            ) : (
              <NavLink to="/auth" className="full end">
                <div>Login</div>
              </NavLink>
            )}
            <button
              type="button"
              className="menu"
              onClick={() => setIsMenu(!isMenu)}
            >
              <CiMenuFries />
            </button>
          </div>
        </div>
      </div>
      <footer>
        <div>
          <NavLink to="/polls" className="full end">
            <div>Polls</div>
            <BiPoll />
          </NavLink>
          <NavLink to="/create" className="full end">
            <div>Create</div>
            <PiTrolleySuitcase />
          </NavLink>
          <NavLink to="/vote" className="full end">
            <div>Vote</div>
            <LuVote />
          </NavLink>
          {user ? (
            <button
              type="button"
              className="logout full end"
              onClick={async () => await handleLogout()}
            >
              <div>Logout</div>
              <BiLogOut />
            </button>
          ) : (
            <NavLink to="/auth full end">
              <div>Login</div>
              <BiLogIn />
            </NavLink>
          )}
        </div>
      </footer>
    </nav>
  );
};
