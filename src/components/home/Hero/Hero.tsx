import { useNavigate } from 'react-router-dom';

import Button from '../../ui/Button/Button';
import { ROUTES } from '../../../constants/routes';

import css from './Hero.module.css';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className={css.hero}>
      <div className={css.content}>
        <h1 className={css.title}>
          Unlock your potential with the best{' '}
          <span className={css.accent}>language</span> tutors
        </h1>

        <p className={css.text}>
          Embark on an Exciting Language Journey with Expert Language Tutors:
          Elevate your language proficiency to new heights by connecting with
          highly qualified and experienced tutors.
        </p>

        <Button className={css.button} onClick={() => navigate(ROUTES.TEACHERS)}>
          Get started
        </Button>
      </div>

      <div className={css.imageWrapper} aria-hidden="true">
        <img className={css.imagePlaceholder} src='/main.svg' alt='Curly smiley girl with a macbook'/>
      </div>
    </section>
  );
}