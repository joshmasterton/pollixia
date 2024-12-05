import { ReactNode, useEffect } from 'react';
import { useAppSelector } from '../store';
import { useNavigate } from 'react-router-dom';

export const Protected = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user]);

  return <>{children}</>;
};

export const Public = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};
