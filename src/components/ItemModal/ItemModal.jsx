import "./ItemModal.css";
import closeIcon from "../../assets/closeicon.svg";
import CurrentUserContext from "../../contexts/ CurrentUserContext";
import { useContext } from "react";

function ItemModal({ activeModal, card, onClose, openConfirmationModal }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card?.ownergit === currentUser?._id;

  // console.log("Card Owner:", card.owner);
  // console.log("Current User:", currentUser);
  // console.log("Is Own:", isOwn);

  return (
    <div className={`modal ${activeModal === "preview" && "modal_visible"}`}>
      <div className="modal__content modal__content_type_image">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="close-icon" className="modal__close-img" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-2">
            <h2 className="modal__caption">{card.name}</h2>
            {isOwn && (
              <button
                className="modal__delete"
                alt="delete-button"
                type="submit"
                onClick={() => {
                  openConfirmationModal(card._id);
                }}
              >
                Delete Item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
