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
import { FirebaseError } from 'firebase/app';

export const Auth = () => {
  const dispatch = useAppDispatch();

  // Login with google
  const handleLogin = async (type: 'google' | 'github') => {
    try {
      const result = await signInWithPopup(
        auth,
        type === 'google' ? googleProvider : githubProvider,
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
      } else {
        dispatch(clearUser());
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/account-exists-with-different-credential') {
          const email = error.customData?.email as string;

          window.close();

          setTimeout(() => {
            alert(
              `${email} already associated with an account, please log in with ${type === 'google' ? 'github' : 'google'}`,
            );
          }, 500);
        }
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
            className="outline large full"
            onClick={() => handleLogin('google')}
          >
            <FcGoogle className="group" />
            <div>Sign in with Google</div>
          </button>
        </main>
      </div>
    </div>
  );
};