import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ handleDeleteItem, activeModal, onClose }) {
  return (
    <div
      className={`modal ${activeModal === "delete-confirmation" && "modal_opened"}`}
    >
      <div className="modal__content modal__content_confirm-form">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <div className="modal__content-confirmation">
          <div className="modal__confirmation-text">
            <p className="modal__title">
              Are you sure you want to delete this item?
            </p>
            <p className="modal__caption">This action is irreversible.</p>
          </div>
          <div className="modal__confirmation-buttons">
            <button onClick={handleDeleteItem} className="modal__delete-button">
              Yes, delete item
            </button>
            <button onClick={onClose} className="modal__cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
