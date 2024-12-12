import { React, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  onCloseModal,
  handleRegistration,
  isOpen,
  handleLoginClick,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
  });

  // const handleChange = (event) => {
  //   setData((prevState) => ({
  //     ...prevState,
  //     [event.target.id]: event.target.value, // Update specific field
  //   }));
  // };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const key = id.replace("register-", "");
    setData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onCloseModal}
      handleSubmit={handleSubmit}
    >
      <label htmlFor="register-email" className="modal__form-label">
        Email *
      </label>
      <input
        type="email"
        className="modal__form-input"
        id="register-email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="register-password" className="modal__form-label">
        Password *
      </label>
      <input
        type="password"
        className="modal__form-input"
        id="register-password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
        required
      />
      <label htmlFor="register-name" className="modal__form-label">
        Name *
      </label>
      <input
        type="text"
        className="modal__form-input"
        id="register-name"
        placeholder="Name"
        value={data.name}
        onChange={handleChange}
      />
      <label htmlFor="register-avatarUrl" className="modal__form-label">
        Avatar URL *
      </label>
      <input
        type="URL"
        className="modal__form-input"
        id="register-avatarUrl"
        placeholder="Avatar URL"
        value={data.avatarUrl}
        onChange={handleChange}
        required
      />
      <div className="modal__buttons">
        {/* <button className="modal__button" type="submit">
              Sign Up
            </button> */}
        <button
          type="button"
          onClick={handleLoginClick}
          className="modal__login-link"
        >
          or Log in
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
