import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

interface ProtectedRouteProps {
  allowedRoles: Array<'admin' | 'cliente'>;
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/client-access/login" state={{ from: location }} replace />;
  }

  if (user && !allowedRoles.includes(user.rol)) {
    const redirect = user.rol === 'admin' ? '/client-access/admin' : '/client-access/app';
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
