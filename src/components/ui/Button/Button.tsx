import type { ButtonHTMLAttributes, ReactNode } from 'react';
import css from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${css.button} ${css[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
