import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={css.loaderContainer}>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#feeccc', '#FEF1DB', '#FFCBD3', '#FFDAE0FF', '#C4F2FE']}
      />
    </div>
  );
};

export default Loader;
