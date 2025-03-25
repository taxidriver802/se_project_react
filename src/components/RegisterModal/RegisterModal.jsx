import { useState, useEffect } from 'react';

import useForm from '../../hooks/useForm';

import './RegisterModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

export default function RegisterModal({
  onClose,
  isOpen,
  onRegister,
  isLoading,
  switchModal,
}) {
  const { values, handleChange, setValues } = useForm({
    email: '',
    password: '',
    name: '',
    avatar: '',
  });

  const [errors, setErrors] = useState({
    email: '',
  });

  useEffect(() => {
    setValues({
      name: '',
      email: '',
      password: '',
      avatar: '',
    });
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ email: '' }); // Clear previous errors

    onRegister({
      email: values.email,
      password: values.password,
      name: values.name,
      avatar: values.avatar,
    }).catch((err) => {
      if (
        err ===
        'Failed to sign up: Network error: Error: 409 - Email already exists'
      ) {
        setErrors((prev) => ({
          ...prev,
          email: 'Email already exists. Please try another.',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: err.message || 'Registration failed. Please try again.',
        }));
      }
    });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText={isLoading ? 'Signing up...' : 'Sign up'}
      buttonText2={'or Log In'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      switchModal={switchModal}
    >
      <label htmlFor="regsiterEmail" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className={`modal__input ${errors.email ? 'modal__input_error' : ''}`}
          id="regsiterEmail"
          placeholder="Email"
          required
          minLength="1"
          maxLength="50"
          onChange={handleChange}
          value={values.email}
        />
        {errors.email && (
          <span className="modal__error-message">{errors.email}</span>
        )}
      </label>

      <label htmlFor="registerPassword" className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          id="registerPassword"
          placeholder="Password"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.password}
        />
      </label>

      <label htmlFor="registerName" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          id="registerName"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name}
        />
      </label>

      <label htmlFor="avatarUrl" className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="avatarUrl"
          placeholder="Avatar URL"
          required
          minLength="1"
          maxLength="300"
          onChange={handleChange}
          value={values.avatar}
        />
      </label>
    </ModalWithForm>
  );
}
