import { useState } from 'react';

import Container from '../../ui/Container/Container';
import Modal from '../../ui/Modal/Modal';

import Logo from './Logo';
import Navigation from './Navigation';
import UserMenu from './UserMenu';

import css from './Header.module.css';
import LoginForm from '../../auth/LoginForm/LoginForm';
import RegistrationForm from '../../auth/RegistrationForm/RegistrationForm';

export default function Header() {
  const [activeModal, setActiveModal] = useState<'login' | 'register' | null>(
    null
  );

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <header className={css.header}>
        <Container>
          <div className={css.inner}>
            <Logo />
            <Navigation />
            <UserMenu
              onLoginClick={() => setActiveModal('login')}
              onRegisterClick={() => setActiveModal('register')}
            />
          </div>
        </Container>
      </header>

      <Modal isOpen={activeModal === 'login'} onClose={closeModal}>
        <LoginForm onSuccess={closeModal} />
      </Modal>

      <Modal isOpen={activeModal === 'register'} onClose={closeModal}>
        <RegistrationForm onSuccess={closeModal} />
      </Modal>
    </>
  );
}
