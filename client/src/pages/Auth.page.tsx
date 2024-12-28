import { FcGoogle } from 'react-icons/fc';
import logo from '../assets/loopza.png';
import {
  signInAnonymously,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import {
  auth,
  githubProvider,
  googleProvider,
} from '../config/firebase.config';
import {
  clearLoading,
  clearUser,
  setLoading,
  setUser,
} from '../features/userSlice.feature';
import { useAppDispatch, useAppSelector } from '../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { activatePopup } from '../features/popupSlice.feature';
import { PiAlienFill } from 'react-icons/pi';
import defaultAvatar from '../assets/ghost.jpg';
import { Loading } from '../utilities/Loading.utilities';
import { useState } from 'react';

export const Auth = () => {
  const { loading } = useAppSelector((state) => state.user);
  const [type, setType] = useState<
    'google' | 'github' | 'anonymous' | undefined
  >(undefined);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Login with google
  const handleLogin = async (type: 'google' | 'github' | 'anonymous') => {
    try {
      dispatch(setLoading());

      let result: UserCredential;
      setType(type);

      if (type === 'anonymous') {
        result = await signInAnonymously(auth);
      } else {
        result = await signInWithPopup(
          auth,
          type === 'google'
            ? googleProvider.setCustomParameters({ prompt: 'select_account' })
            : githubProvider,
        );
      }

      if (result.user) {
        const idToken = await result.user.getIdToken();

        if (result.user.isAnonymous) {
          dispatch(
            setUser({
              uid: result.user.uid,
              displayName: `guest${result.user.uid.slice(0, 10)}`,
              email: result.user.email,
              photoURL: defaultAvatar,
              idToken,
            }),
          );
        } else {
          dispatch(
            setUser({
              uid: result.user.uid,
              displayName: result.user.displayName,
              email: result.user.email,
              photoURL: result.user.photoURL,
              idToken,
            }),
          );
        }

        const from = location.state?.from?.pathname || '/polls';
        navigate(from);
      } else {
        dispatch(clearUser());
      }
    } catch {
      activatePopup(dispatch, 'Error signing in', '');
    } finally {
      dispatch(clearLoading());
      setType(undefined);
    }
  };

  return (
    <div id="auth">
      <div>
        <header>
          <img className="logo" alt="logo" src={logo} />
          <div>
            <h2>Pollixia</h2>
            <div>Please sign in to continue</div>
          </div>
        </header>
        <main>
          <button
            type="button"
            disabled={loading}
            className="background large full"
            onClick={() => handleLogin('google')}
          >
            {loading && type === 'google' ? (
              <Loading />
            ) : (
              <>
                <FcGoogle className="group" />
                <p>Sign in with Google</p>
              </>
            )}
          </button>
          <button
            type="button"
            className="background large full"
            onClick={() => handleLogin('anonymous')}
          >
            {loading && type === 'anonymous' ? (
              <Loading />
            ) : (
              <>
                <PiAlienFill className="group" />
                <p>Sign in anonymously</p>
              </>
            )}
          </button>
        </main>
      </div>
    </div>
  );
};
