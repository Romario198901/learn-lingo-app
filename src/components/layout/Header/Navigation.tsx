import { NavLink } from 'react-router-dom';
import { NAVIGATION_LINKS } from '../../../constants/navigation';
import css from './Header.module.css';

export default function Navigation() {
  return (
    <nav className={css.navigation}>
      {NAVIGATION_LINKS.map(({ label, path }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            isActive ? `${css.navLink} ${css.active}` : css.navLink
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
