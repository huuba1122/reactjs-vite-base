const path = (parent, child) => `${parent}/${child}`;

const ROOT_PUBLIC = '';
const ROOT_ADMIN = 'admin';

const AUTH_PATHS = {
  login: path(ROOT_PUBLIC, 'login'),
  signUp: path(ROOT_PUBLIC, 'sign-up'),
  logout: path(ROOT_PUBLIC, 'logout')
};

const PUBLIC_PATHS = {
  home: ROOT_PUBLIC,
  post: {
    root: path(ROOT_PUBLIC, 'post'),
    detail: path(ROOT_PUBLIC, 'post/:id')
  }
};

const PRIVATE_PATHS = {
  root: ROOT_ADMIN,
  user: {
    root: path(ROOT_ADMIN, 'users'),
    detail: path(ROOT_ADMIN, 'users/:id')
  }
};

export { AUTH_PATHS, PUBLIC_PATHS, PRIVATE_PATHS };
