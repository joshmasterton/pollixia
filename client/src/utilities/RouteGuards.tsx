import { ReactNode, useEffect } from 'react';
import { useAppSelector } from '../store';
import { useLocation, useNavigate } from 'react-router-dom';

export const Protected = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return <>{children}</>;
};

export const Public = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (location.pathname === '/login') {
      if (user) {
        navigate('/');
      }
    }
  }, [user]);

  return <>{children}</>;
};
