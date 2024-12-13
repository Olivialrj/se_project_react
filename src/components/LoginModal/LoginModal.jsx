import { useState } from "react";
import "./LoginModal.css";
import closeIcon from "../../assets/closeicon.svg";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  onCloseModal,
  handleLogin,
  isOpen,
  handleRegisterClick,
}) => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    const key = id.replace("login-", ""); // Strip "update-" to match the state keys
    setData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onCloseModal}
      handleSubmit={handleSubmit}
    >
      <label htmlFor="login-email" className="modal__form-label">
        Email
      </label>
      <input
        type="email"
        className="modal__form-input"
        id="login-email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
      />
      <label htmlFor="login-password" className="modal__form-label">
        Password
      </label>
      <input
        type="password"
        className="modal__form-input"
        id="login-password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={handleRegisterClick}
        className="modal__register-link"
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
};
export default LoginModal;
