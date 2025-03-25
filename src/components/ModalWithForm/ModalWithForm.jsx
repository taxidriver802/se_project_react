import { useState, useEffect } from 'react';

import './ModalWithForm.css';

function ModalWithForm({
  children,
  buttonText,
  buttonText2,
  title,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  switchModal,
}) {
  return (
    <div className={`modal ${isOpen && 'modal_opened'}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close" />
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__submit-buttons">
            <button
              type="submit"
              disabled={isLoading}
              className="modal__submit"
            >
              {buttonText}
            </button>
            <button
              type="button"
              disabled={isLoading}
              className="modal__submit modal__submit-alt"
              onClick={switchModal}
            >
              {buttonText2}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
