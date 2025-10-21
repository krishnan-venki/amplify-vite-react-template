import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate } from 'react-router-dom';

/**
 * Smart redirect component for the root path.
 * If user is logged in, redirect to dashboard.
 * Otherwise, redirect to home page.
 */
export const RootRedirect: React.FC = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/home" replace />;
};
