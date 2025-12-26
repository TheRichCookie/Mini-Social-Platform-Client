import type {Routes} from '@angular/router';

export const APP_ROUTES = {
  AUTH: {
    ROOT: 'auth',
    CHILDREN: {
      SIGN_IN: 'sign-in',
      SIGN_UP: 'sign-up',
      OTP: 'otp',
      LOGOUT: 'logout',
    },
  },
  HOME: {
    ROOT: 'home',
  },
  POST: {
    ROOT: 'post',
    CHILD: {
      CREATE: 'create',
      GET: ':id',
    },
  },
  MESSAGES: {
    ROOT: 'messages',
  },
  PROFILE: {
    ROOT: 'profile',
    CHILD: {
      edit: 'edit',
    },
  },
  FRIENDS: {
    ROOT: 'friends',
  },
  SEARCH: {
    ROOT: 'search',
  },
  NOTIFICATION: {
    ROOT: 'notifications',
  },
};

export const routes: Routes = [
  {
    path: '',
    loadChildren: async () =>
      import('./layouts/general/_/general-layout.routes').then(
        (r) => r.GENERAL_LAYOUT_ROUTES,
      ),
  },
];
