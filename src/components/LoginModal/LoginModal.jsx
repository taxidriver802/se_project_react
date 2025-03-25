import { useState, useEffect } from 'react';

import { useForm } from '../../hooks/useForm';

import './LoginModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

export default function LoginModal({
  onClose,
  isOpen,
  onLogin,
  isLoading,
  setActiveModal,
}) {
  const { values, handleChange, setValues } = useForm({
    email: '',
    password: '',
  });

  useEffect(() => {
    setValues({
      email: '',
      password: '',
    });
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin({
      email: values.email,
      password: values.password,
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
          onChange={handleChange}
          value={values.email}
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
          onChange={handleChange}
          value={values.password}
        />
      </label>
    </ModalWithForm>
  );
}
