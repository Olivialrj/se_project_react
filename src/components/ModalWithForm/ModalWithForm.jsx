import "./ModalWithForm.css";
import closeIcon from "../../assets/closeicon.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  handleAddItemSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_visible" : ""}`}>
      <div className="modal__container">
        <p className="modal__header">{title}</p>
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="close-icon" className="modal__close-img" />
        </button>
        <form className="modal__form">
          {children}
          <button
            className="modal__button"
            type="submit"
            onClick={handleAddItemSubmit}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
