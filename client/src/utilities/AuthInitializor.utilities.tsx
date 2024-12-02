import { onAuthStateChanged } from 'firebase/auth';
import { ReactNode, useEffect, useState } from 'react';
import { auth } from '../config/firebase.config';
import { clearUser, setUser } from '../features/userSlice.feature';
import { useAppDispatch } from '../store';
import { Loading } from './Loading.utilities';

export const AuthInitializor = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const onStateChange = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();

        dispatch(
          setUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            idToken,
          }),
        );
      } else {
        dispatch(clearUser());
      }

      setLoading(false);
    });

    return () => onStateChange();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};
