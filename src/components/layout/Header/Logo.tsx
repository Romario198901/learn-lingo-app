import { Link } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';

import css from './Header.module.css';

export default function Logo() {
  return (
    <Link className={css.logo} to={ROUTES.HOME} aria-label="LearnLingo home">
      <img
        className={css.logoIcon}
        src="/ukraine.svg"
        alt=""
        aria-hidden="true"
      />

      <span className={css.logoText}>LearnLingo</span>
    </Link>
  );
}
