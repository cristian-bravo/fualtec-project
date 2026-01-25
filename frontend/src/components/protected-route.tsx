import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

interface ProtectedRouteProps {
  allowedRoles: Array<'admin' | 'cliente' | 'super_admin'>;
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/client-access/login" state={{ from: location }} replace />;
  }

  if (user) {
    const isAdmin = user.rol === 'admin' || Boolean(user.is_super_admin);
    const isAllowed =
      allowedRoles.includes(user.rol) || (isAdmin && allowedRoles.includes('admin'));
    if (!isAllowed) {
      const redirect = isAdmin ? '/client-access/admin' : '/client-access/app';
      return <Navigate to={redirect} replace />;
    }
  }

  return <Outlet />;
};
