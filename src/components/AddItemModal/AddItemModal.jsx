import { useState, useEffect } from 'react';

import { useForm } from '../../hooks/useForm';

import './AddItemModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
  isLoading,
}) {
  const { values, handleChange, setValues } = useForm({
    name: '',
    imageUrl: '',
    weather: '',
  });

  useEffect(() => {
    setValues({
      name: '',
      imageUrl: '',
      weather: '',
    });
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit(values);
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText={isLoading ? 'Saving...' : 'Add garment'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{' '}
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          minLength="1"
          maxLength="300"
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal_label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="hot"
            onChange={handleChange}
            checked={values.weather === 'hot'}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal_label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="warm"
            onChange={handleChange}
            checked={values.weather === 'warm'}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal_label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="cold"
            onChange={handleChange}
            checked={values.weather === 'cold'}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
