import { useState, useEffect } from 'react';

import './LoginModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

export default function LoginModal({
  onClose,
  isOpen,
  onLogin,
  isLoading,
  setActiveModal,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [isOpen]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin({
      email,
      password,
    });
  };
  return (
    <ModalWithForm
      title="Log In"
      buttonText={isLoading ? 'Logging in...' : 'Log in'}
      buttonText2={'or Sign Up'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      activeModal="login"
      setActiveModal={setActiveModal}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          id="loginEmail"
          placeholder="Email"
          required
          minLength="1"
          maxLength="30"
          onChange={handleEmailChange}
          value={email}
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          id="loginPassword"
          placeholder="Password"
          required
          minLength="1"
          maxLength="30"
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
    </ModalWithForm>
  );
}
