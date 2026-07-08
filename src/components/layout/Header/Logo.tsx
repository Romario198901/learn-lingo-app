import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import css from './Header.module.css';

export default function Logo() {
  return (
    <Link className={css.logo} to={ROUTES.HOME} aria-label="LearnLingo home">
      <img src="/ukraine.svg" alt="Logo" />
      <span className={css.logoText}>LearnLingo</span>
    </Link>
  );
}
