import { ColorRing } from 'react-loader-spinner';

import css from './Loader.module.css';

export default function Loader() {
  return (
    <div
      className={css.loader}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <ColorRing
        visible
        width="80"
        height="80"
        colors={['#feeccc', '#FEF1DB', '#FFCBD3', '#FFDAE0', '#C4F2FE']}
      />
    </div>
  );
}
