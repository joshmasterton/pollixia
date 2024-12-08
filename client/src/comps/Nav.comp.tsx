import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { clearUser } from '../features/userSlice.feature';
import { CiMenuFries } from 'react-icons/ci';
import { BiLogIn, BiLogOut, BiPoll } from 'react-icons/bi';
import { PiTrolleySuitcase } from 'react-icons/pi';
import logo from '../assets/loopza.png';
import { GrGraphQl } from 'react-icons/gr';
import { Theme } from './Theme.comp';
import { CgClose } from 'react-icons/cg';

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

  const handleScroll = () => {
    setIsMenu(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${type} ${isMenu ? `active` : ``}`}>
      <div>
        <span />
        <header>
          <div className="img">
            <img alt="logo" src={logo} className="full paddingSmall end" />
          </div>
          <h3>{title}</h3>
        </header>
        <main>
          <NavLink to="/polls" className="end">
            <div>Polls</div>
          </NavLink>
          <NavLink to="/create" className="end">
            <div>Create</div>
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
              <NavLink to="/auth" className="full end login">
                <div>Login</div>
              </NavLink>
            )}
            <button
              type="button"
              className="menu"
              onClick={() => setIsMenu(!isMenu)}
            >
              {isMenu ? <CgClose /> : <CiMenuFries />}
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
          <NavLink to="/results" className="full end">
            <div>Results</div>
            <GrGraphQl />
          </NavLink>
          {user ? (
            <button
              type="button"
              className="logout full end"
              onClick={async () => {
                await handleLogout();
                setIsMenu(false);
              }}
            >
              <div>Logout</div>
              <BiLogOut />
            </button>
          ) : (
            <NavLink to="/auth" className="full end">
              <div>Login</div>
              <BiLogIn />
            </NavLink>
          )}
          <Theme />
        </div>
      </footer>
    </nav>
  );
};
