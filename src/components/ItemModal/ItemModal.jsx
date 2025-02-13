import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, handleDeleteItem }) {

  return (
    <div className={`modal  ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__item">
        <div className="modal__content_type_image">
          <button
            onClick={onClose}
            type="button"
            className="modal__close"
          ></button>
          <img src={card.imageUrl} alt={card.name} className="modal__image" />
        </div>
        <div className="modal__footer">
          <div className="modal__footer-text">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <div className="modal__footer-button-container">
            <button onClick={handleDeleteItem} className="modal__footer-button" type="button">
              Delete Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
