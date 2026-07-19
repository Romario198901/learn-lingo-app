import Button from '../../ui/Button/Button';
import { useAuth } from '../../../hooks/useAuth';
import css from './Header.module.css';
import { AUTH_NAVIGATION_LINKS } from '../../../constants/navigation';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import toast from 'react-hot-toast';

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
    } catch {
      toast.error('Failed to logout');
    }
  };

  if (isAuth) {
    return (
      <div className={css.userMenu}>
        <nav className={css.authNavigation}>
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

        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className={css.userMenu}>
      <button className={css.loginButton} type="button" onClick={onLoginClick}>
        <svg width={20} height={20}>
          <use href="/sprite.svg#icon-login"></use>
        </svg>
        Log in
      </button>

      <Button variant="secondary" onClick={onRegisterClick}>
        Registration
      </Button>
    </div>
  );
}
