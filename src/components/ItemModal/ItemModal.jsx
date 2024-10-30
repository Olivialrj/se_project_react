import "./ItemModal.css";
import closeIcon from "../../assets/closeicon.svg";

function ItemModal({ activeModal, card, onClose }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_visible"}`}>
      <div className="modal__content modal__content_type_image">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="close-icon" className="modal__close-img" />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
