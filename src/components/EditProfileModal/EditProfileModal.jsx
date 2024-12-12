import { useState } from "react";
import "./EditProfileModal.css";
import closeIcon from "../../assets/closeicon.svg";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({ handleEditProfile, onCloseModal, isOpen }) => {
  const [data, setData] = useState({ name: "", avatar: "" });

  // const handleChange = (e) => {
  //   // const { name, value } = e.target;
  //   // setData((prevData) => ({
  //   //   ...prevData,
  //   //   [name]: value,
  //   setData((prevState) => ({
  //     ...prevState,
  //     [e.target.id]: event.target.value,
  //   }));
  // };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const key = id.replace("update-", ""); //
    setData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(data);
    console.log(data);
  };

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText="Save Changes"
      isOpen={isOpen}
      onClose={onCloseModal}
      handleSubmit={handleSubmit}
    >
      {/* <div className={`modal edit-profile ${isOpen ? "modal_visible" : ""}`}>
      <div className="modal__edit-profile">
        <p className="modal__header">Change profile data</p>
        <button className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="close-icon" className="modal__close-img" />
        </button> */}
      <form className="modal__form" onSubmit={handleSubmit}>
        <label className="modal__form-label">Name *</label>
        <input
          type="name"
          className="modal__form-input"
          id="update-name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
        />
        <label className="modal__form-label">Avatar *</label>
        <input
          type="url"
          className="modal__form-input"
          id="update-avatar"
          placeholder="Avatar"
          value={data.avatar}
          onChange={handleChange}
        />
        {/* <button className="modal__button" type="submit">
          Save changes
        </button> */}
      </form>
    </ModalWithForm>
  );
};

export default EditProfileModal;
