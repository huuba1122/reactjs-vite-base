import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { AUTH_PATHS } from '../path';

function PrivateRouter() {
  const isAuthenticated = true;

  return isAuthenticated ? <Outlet /> : <Navigate to={AUTH_PATHS.login} />;
}

PrivateRouter.displayName = 'PrivateRouter';
export default PrivateRouter;
