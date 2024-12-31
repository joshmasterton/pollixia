import logo from '../assets/loopza.png';
import {
  linkWithCredential,
  OAuthProvider,
  signInAnonymously,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import {
  auth,
  microsoftProvider,
  googleProvider,
  githubProvider,
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
import { BiLogoMicrosoft } from 'react-icons/bi';
import { FirebaseError } from 'firebase/app';
import { IoLogoGithub } from 'react-icons/io';
import { FaGoogle } from 'react-icons/fa';

export const Auth = () => {
  const { loading } = useAppSelector((state) => state.user);
  const [type, setType] = useState<
    'google' | 'microsoft' | 'github' | 'anonymous' | undefined
  >(undefined);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Login with google
  const handleLogin = async (
    type: 'google' | 'microsoft' | 'github' | 'anonymous',
  ) => {
    try {
      const storedPendingCredentail = sessionStorage.getItem(
        'pollixia_pendingCredential',
      );

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
            : type === 'microsoft'
              ? microsoftProvider
              : githubProvider,
        );
      }

      if (result?.user) {
        const idToken = await result.user.getIdToken();

        if (storedPendingCredentail) {
          const parsedPendingCredential = OAuthProvider.credentialFromJSON(
            JSON.parse(storedPendingCredentail),
          );

          const linkedUser = await linkWithCredential(
            result.user,
            parsedPendingCredential,
          );

          activatePopup(
            dispatch,
            `Successfully linked account with ${linkedUser.providerId}`,
            '',
          );

          sessionStorage.clear();
        }

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
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/account-exists-with-different-credential') {
          const credential = OAuthProvider.credentialFromError(error);

          if (credential) {
            sessionStorage.setItem(
              'pollixia_pendingCredential',
              JSON.stringify(credential),
            );
          }

          const verifiedProviderEmail = error?.customData?._tokenResponse as {
            verifiedProvider: string[];
          };

          activatePopup(
            dispatch,
            `User already exists. Log in with ${verifiedProviderEmail.verifiedProvider[0]} to link accounts`,
            '',
          );
        }
      } else {
        activatePopup(dispatch, 'Error signing in', '');
      }
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
                <FaGoogle className="group" />
                <p>Sign in with Google</p>
              </>
            )}
          </button>
          <button
            type="button"
            disabled={loading}
            className="background large full"
            onClick={() => handleLogin('github')}
          >
            {loading && type === 'github' ? (
              <Loading />
            ) : (
              <>
                <IoLogoGithub className="group" />
                <p>Sign in with Github</p>
              </>
            )}
          </button>
          <button
            type="button"
            disabled={loading}
            className="background large full"
            onClick={() => handleLogin('microsoft')}
          >
            {loading && type === 'microsoft' ? (
              <Loading />
            ) : (
              <>
                <BiLogoMicrosoft className="group" />
                <p>Sign in with Microsoft</p>
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
