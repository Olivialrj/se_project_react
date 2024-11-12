import "./DeleteModal.css";
import closeIcon from "../../assets/closeicon.svg";

const DeleteModal = ({ onClose, handleDeleteItem, isOpen }) => {
  return (
    <div className={`delete-modal ${isOpen ? "modal_visible" : ""}`}>
      <div className="delete-modal__container">
        <button type="button" className="modal__close-btn" onClick={onClose}>
          <img src={closeIcon} alt="close-icon" className="modal__close-icon" />
        </button>
        <p className="modal__header">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>
        <div className="modal__btn-container">
          <button
            className="modal__confirm-btn"
            type="submit"
            onClick={handleDeleteItem}
          >
            Yes, delete item
          </button>
          <button className="modal__cancel-btn" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
