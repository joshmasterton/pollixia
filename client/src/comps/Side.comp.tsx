import { NavLink } from 'react-router-dom';
import logo from '../assets/loopza.png';
import { BiLogIn, BiLogOut, BiPoll } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../store';
import { signOut } from 'firebase/auth';
import { clearUser } from '../features/userSlice.feature';
import { auth } from '../config/firebase.config';
import { Theme } from './Theme.comp';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { AiOutlineCoffee } from 'react-icons/ai';

export const Side = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

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
    <div className="side">
      <ul>
        <header>
          <div className="img padding">
            <img alt="logo" src={logo} />
          </div>
          <h4 className="paddingSmall">Pollixia</h4>
        </header>
        <div>
          <h4>Menu</h4>
          {user && (
            <NavLink to="/" className="full start">
              <div className="img padding">
                <img alt="user" src={user.photoURL} className="full end" />
              </div>
              <div>{user.displayName}</div>
            </NavLink>
          )}
          <NavLink to="/polls" className="full start">
            <BiPoll />
            <div>Polls</div>
          </NavLink>
          <NavLink to="/privacy" className=" full start">
            <MdOutlinePrivacyTip />
            <div>Privacy</div>
          </NavLink>
          {user ? (
            <button
              type="button"
              className="full start logout"
              onClick={async () => await handleLogout()}
            >
              <BiLogOut />
              <div>Logout</div>
            </button>
          ) : (
            <NavLink to="/login" className="full start">
              <BiLogIn />
              <div>Login</div>
            </NavLink>
          )}
        </div>
        <div>
          <h4>Poll</h4>
          <NavLink to="/create" className="full start">
            <AiOutlineCoffee />
            <div>Create</div>
          </NavLink>
        </div>
        <div>
          <Theme />
        </div>
      </ul>
    </div>
  );
};
