import clsx from 'clsx';
import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';

import css from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({
  error,
  className,
  type = 'text',
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';

  return (
    <div className={css.wrapper}>
      <div className={css.inputWrapper}>
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={clsx(css.input, error && css.errorInput, className)}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className={css.eyeButton}
            onClick={() => setShowPassword(prev => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <svg className={css.eyeIcon}>
              <use
                href={`/sprite.svg#${
                  showPassword ? 'icon-eye-off' : 'icon-eye'
                }`}
              />
            </svg>
          </button>
        )}
      </div>

      {error && <span className={css.errorText}>{error}</span>}
    </div>
  );
}
