import { useState, useEffect } from 'react';

import './RegisterModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

export default function RegisterModal({
  onClose,
  isOpen,
  onRegister,
  isLoading,
  setActiveModal,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const [errors, setErrors] = useState({
    email: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ email: '' }); // Clear previous errors

    onRegister({
      email,
      password,
      name,
      avatar,
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

  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
    setAvatar('');
  }, [isOpen]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAvatarUrlChange = (e) => {
    setAvatar(e.target.value);
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
      activeModal="register"
      setActiveModal={setActiveModal}
    >
      <label htmlFor="email" className="modal__label">
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
          onChange={handleEmailChange}
          value={email}
        />
        {errors.email && (
          <span className="modal__error-message">{errors.email}</span>
        )}
      </label>

      <label htmlFor="password" className="modal__label">
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
          onChange={handlePasswordChange}
          value={password}
        />
      </label>

      <label htmlFor="name" className="modal__label">
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
          onChange={handleNameChange}
          value={name}
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Avatar URL
        <input
          type="url"
          name="url"
          className="modal__input"
          id="avatarUrl"
          placeholder="Avatar URL"
          required
          minLength="1"
          maxLength="300"
          onChange={handleAvatarUrlChange}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
}
