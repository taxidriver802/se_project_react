import { useState, useEffect } from 'react';

import './EditProfileModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

export default function EditProfileModal({
  onClose,
  isOpen,
  onProfileChange,
  isLoading,
  currentUser,
}) {
  if (!currentUser) {
    return null;
  }

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setAvatar(currentUser.avatar || '');
    }
  }, [isOpen, currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onProfileChange({
      name: name,
      avatar: avatar,
    });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText={isLoading ? 'Saving...' : 'Save changes'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label htmlFor="edit__profile-name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          id="edit__profile-name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>

      <label htmlFor="edit__profile-avatar" className="modal__label">
        Avatar
        <input
          type="url"
          name="url"
          className="modal__input"
          id="edit__profile-avatar"
          required
          minLength="1"
          maxLength="300"
          onChange={handleAvatarChange}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
}
