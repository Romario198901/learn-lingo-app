import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import Loader from '../components/Loader/Loader';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }
  if (!isAuth) {
    return <Navigate to="/teachers" replace />;
  }
  return children;
}
