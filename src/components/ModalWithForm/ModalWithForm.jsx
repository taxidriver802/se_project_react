import "./ModalWithForm.css"

function ModalWithForm({ children, buttonText, title, activeModal }) {
    return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
        <div className="modal__content">
            <h2 className="modal__title">New Garment</h2>
            <button type="button" className="modal__close">{title}</button>
        <form className="modal__form">
            {children}
            <button type="subimt" className="modal__submit">{buttonText}</button>
        </form>
        </div>
    </div>
)
}

export default ModalWithForm;