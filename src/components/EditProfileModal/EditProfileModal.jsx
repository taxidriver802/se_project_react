import { useContext, useEffect } from 'react';

import useForm from '../../hooks/useForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import './EditProfileModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

export default function EditProfileModal({
  onClose,
  isOpen,
  onProfileChange,
  isLoading,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  if (!currentUser) {
    return null;
  }

  const { values, handleChange, setValues } = useForm({
    name: '',
    avatar: '',
  });

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name || '',
        avatar: currentUser.avatar || '',
      });
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onProfileChange({
      name: values.name,
      avatar: values.avatar,
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
          onChange={handleChange}
          value={values.name}
        />
      </label>

      <label htmlFor="edit__profile-avatar" className="modal__label">
        Avatar
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="edit__profile-avatar"
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
