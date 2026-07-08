import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import clsx from 'clsx';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function Modal({
  children,
  isOpen,
  onClose,
  className = '',
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackDropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackDropClick}>
      <div className={clsx(css.modal, className)}>
        <button
          className={css.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width={32} height={32}>
            <use href="/sprite.svg#icon-close"></use>
          </svg>
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}
