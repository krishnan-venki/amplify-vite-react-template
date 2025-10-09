import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import SagaaHomepage from './homepage/SagaaHomepage';

import { Outlet } from 'react-router-dom';

const AuthWrapper: React.FC = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  if (!user) {
    return <SagaaHomepage />;
  }

  return <Outlet />;
};

export default AuthWrapper;