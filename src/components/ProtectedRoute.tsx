import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const location = useLocation();

  if (!user) {
    // Redirect to sign in page with the original path as a query parameter
    const from = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/signin?from=${from}`} replace />;
  }

  return <>{children}</>;
};
