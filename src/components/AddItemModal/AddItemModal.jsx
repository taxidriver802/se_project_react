import { useState, useEffect } from 'react';

import './AddItemModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
  isLoading,
}) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [weather, setWeather] = useState('');

  useEffect(() => {
    //empty input fields
    setName('');
    setImageUrl('');
    setWeather('');
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ name, imageUrl, weather });

    //update clothing items array && close modal
    onAddItemModalSubmit({ name, imageUrl, weather });
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
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{' '}
        <input
          type="url"
          name="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          minLength="1"
          maxLength="300"
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal_label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="radioButton"
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === 'hot'}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal_label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="radioButton"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === 'warm'}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal_label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="radioButton"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === 'cold'}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
