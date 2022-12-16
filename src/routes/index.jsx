import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// components
import BlankLayout from '@layouts/blank';
import MainLayout from '@layouts/main';
import Loading from '@components/Loading';
import NotFoundPage from '@components/NotFound';
import PostPage from '@pages/post';

//
import PrivateRouter from './guards/Private';
import { PUBLIC_PATHS, PRIVATE_PATHS, AUTH_PATHS } from './path';

// ----------------------------------------------------------------
const lazyImport = (Component) => (props) => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Component {...props} />
    </React.Suspense>
  );
};

const HomePage = lazyImport(lazy(() => import('@pages/home')));
const LoginPage = lazyImport(lazy(() => import('@pages/auth/Login')));
const SignUpPage = lazyImport(lazy(() => import('@pages/auth/SignUp')));
// const PostPage = lazyImport(lazy(() => import('@pages/post')));
const UserPage = lazyImport(lazy(() => import('@pages/user')));

export default function IndexRoute() {
  return useRoutes([
    {
      path: PUBLIC_PATHS.home,
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: PUBLIC_PATHS.post.root, element: <PostPage /> }
      ]
    },
    {
      element: <BlankLayout />,
      children: [
        {
          path: AUTH_PATHS.login,
          element: <LoginPage />
        },
        {
          path: AUTH_PATHS.signUp,
          element: <SignUpPage />
        }
      ]
    },
    {
      path: PRIVATE_PATHS.root,
      element: <PrivateRouter />,
      children: [
        {
          element: <MainLayout />,
          children: [{ path: PRIVATE_PATHS.user.root, element: <UserPage /> }]
        }
      ]
    },
    { path: '*', element: <NotFoundPage /> }
  ]);
}
