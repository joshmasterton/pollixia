import { FcGoogle } from 'react-icons/fc';
import logo from '../assets/loopza.png';
import { signInWithPopup } from 'firebase/auth';
import {
  auth,
  githubProvider,
  googleProvider,
} from '../config/firebase.config';
import { clearUser, setUser } from '../features/userSlice.feature';
import { useAppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import { activatePopup } from '../features/popupSlice.feature';
import { FirebaseError } from 'firebase/app';

export const Auth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Login with google
  const handleLogin = async (type: 'google' | 'github') => {
    try {
      const result = await signInWithPopup(
        auth,
        type === 'google'
          ? googleProvider.setCustomParameters({ prompt: 'select_account' })
          : githubProvider,
      );

      if (result.user) {
        const idToken = await result.user.getIdToken();

        dispatch(
          setUser({
            uid: result.user.uid,
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
            idToken,
          }),
        );

        navigate('/polls');
      } else {
        dispatch(clearUser());
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        await auth.signOut();

        const email = error.customData?.email as string;
        if (type === 'github') {
          activatePopup(
            dispatch,
            `${email} is already connected to google.`,
            '',
          );
        } else if (type === 'google') {
          activatePopup(
            dispatch,
            `${email} is already connected to github.`,
            '',
          );
        }
      } else if (error instanceof Error) {
        activatePopup(dispatch, error.message, '');
      } else {
        activatePopup(dispatch, 'Error signing in', '');
      }
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
            className="background large full"
            onClick={() => handleLogin('google')}
          >
            <FcGoogle className="group" />
            <p>Sign in with Google</p>
          </button>
        </main>
      </div>
    </div>
  );
};
