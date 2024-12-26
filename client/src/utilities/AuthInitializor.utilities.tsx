import { onAuthStateChanged } from 'firebase/auth';
import { ReactNode, useEffect, useState } from 'react';
import { auth } from '../config/firebase.config';
import { clearUser, setUser } from '../features/userSlice.feature';
import { useAppDispatch } from '../store';
import { Loading } from './Loading.utilities';
import { getTheme } from '../features/themeSlice.feature';
import defaultAvatar from '../assets/ghost.jpg';

export const AuthInitializor = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const onStateChange = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();

        if (user.isAnonymous) {
          dispatch(
            setUser({
              uid: user.uid,
              displayName: `guest${user.uid.slice(0, 10)}`,
              email: user.email,
              photoURL: defaultAvatar,
              idToken,
            }),
          );
        } else {
          dispatch(
            setUser({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              idToken,
            }),
          );
        }
      } else {
        dispatch(clearUser());
      }

      setLoading(false);
    });

    return () => onStateChange();
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        await user.getIdToken(true);
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getTheme(dispatch);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};
