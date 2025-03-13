import { useState, useEffect } from 'react';

import './RegisterModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

export default function RegisterModal({
  onClose,
  isOpen,
  onRegister,
  isLoading,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister({
      email,
      password,
      name,
      avatar,
    });
  };
  return (
    <ModalWithForm
      title="Register"
      buttonText={isLoading ? 'Signing up...' : 'Sign up'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          id="regsiterEmail"
          placeholder="Email"
          required
          minLength="1"
          maxLength="50"
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
