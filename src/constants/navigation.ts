import { ROUTES } from './routes';

export const NAVIGATION_LINKS = [
  {
    label: 'Home',
    path: ROUTES.HOME,
  },
  {
    label: 'Teachers',
    path: ROUTES.TEACHERS,
  },
] as const;

export const AUTH_NAVIGATION_LINKS = [
  {
    label: 'Favorites',
    path: ROUTES.FAVORITES,
  },
] as const;
