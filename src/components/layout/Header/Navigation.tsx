import { NavLink } from 'react-router-dom';
import { NAVIGATION_LINKS } from '../../../constants/navigation';

import css from './Header.module.css';
import clsx from 'clsx';

export default function Navigation() {
  return (
    <nav className={css.navigation} aria-label="Main navigation">
      {NAVIGATION_LINKS.map(({ label, path }) => (
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
  );
}