import clsx from 'clsx';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

import Button from '../../ui/Button/Button';

import { AUTH_NAVIGATION_LINKS } from '../../../constants/navigation';
import { useAuth } from '../../../hooks/useAuth';

import css from './Header.module.css';

interface UserMenuProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export default function UserMenu({
  onLoginClick,
  onRegisterClick,
}: UserMenuProps) {
  const { isAuth, user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('You have successfully logged out.');
    } catch {
      toast.error('Failed to log out. Please try again.');
    }
  };

  if (isAuth) {
    return (
      <div className={css.userMenu}>
        <nav className={css.authNavigation} aria-label="User navigation">
          {AUTH_NAVIGATION_LINKS.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                clsx(css.navLink, isActive && css.active)
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <span className={css.userName}>{user?.displayName ?? user?.email}</span>

        <Button
          className={css.logoutButton}
          variant="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className={css.userMenu}>
      <button className={css.loginButton} type="button" onClick={onLoginClick}>
        <svg
          className={css.loginIcon}
          width="20"
          height="20"
          aria-hidden="true"
        >
          <use href="/sprite.svg#icon-login" />
        </svg>
        Log in
      </button>

      <Button
        className={css.registrationButton}
        variant="secondary"
        onClick={onRegisterClick}
      >
        Registration
      </Button>
    </div>
  );
}
