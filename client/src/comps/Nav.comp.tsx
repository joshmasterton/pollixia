import { NavLink, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { clearUser } from '../features/userSlice.feature';
import { BiChevronLeft, BiLogIn, BiLogOut, BiPoll } from 'react-icons/bi';
import { Theme } from './Theme.comp';
import { CgClose } from 'react-icons/cg';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import logo from '../assets/loopza.png';
import { AiOutlineCoffee } from 'react-icons/ai';
import { RiMenu3Fill } from 'react-icons/ri';

export const Nav = ({ type }: { type: 'home' | 'main' | 'return' }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const currentPage =
    location.pathname.split('/').length === 3
      ? location.pathname.split('/').splice(1, 1)[0]
      : location.pathname.split('/').pop();
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
    <nav
      className={`${type} ${isMenu ? `${user ? `active user` : 'active notUser'}` : `${user ? 'user' : 'notUser'}`}`}
    >
      <div>
        <span />
        <header>
          {type === 'return' ? (
            <div className="img">
              <NavLink to="/polls">
                <BiChevronLeft />
              </NavLink>
            </div>
          ) : (
            <div className="img">
              <img alt="logo" src={logo} className="full paddingSmall end" />
            </div>
          )}
          <h3>{title}</h3>
        </header>
        <main>
          <NavLink to="/polls" className="end">
            <div>Polls</div>
          </NavLink>
          <NavLink to="/create" className="end">
            <div>Create</div>
          </NavLink>
          <NavLink to="/privacy" className="end">
            <div>Privacy</div>
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
              <NavLink to="/login" className="full end login">
                <div>Login</div>
              </NavLink>
            )}
            <button
              type="button"
              className="menu"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.blur();
                setIsMenu(!isMenu);
              }}
            >
              {isMenu ? <CgClose /> : <RiMenu3Fill />}
            </button>
          </div>
        </div>
      </div>
      <footer>
        <div>
          {user && (
            <NavLink to="/" className="full end">
              <div>{user.displayName}</div>
              <div className="img padding">
                <img alt="user" src={user.photoURL} className="full end" />
              </div>
            </NavLink>
          )}
          <NavLink to="/polls" className="full end">
            <div>Polls</div>
            <BiPoll />
          </NavLink>
          <NavLink to="/create" className="full end">
            <div>Create</div>
            <AiOutlineCoffee />
          </NavLink>
          <NavLink to="/privacy" className="full end">
            <div>Privacy</div>
            <MdOutlinePrivacyTip />
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
            <NavLink to="/login" className="full end">
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
