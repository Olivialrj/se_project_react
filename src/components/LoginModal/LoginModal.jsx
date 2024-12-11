import { useState } from "react";
import "./LoginModal.css";
import closeIcon from "../../assets/closeicon.svg";

const LoginModal = ({ onClose, handleLogin, isOpen, handleRegisterClick }) => {
  const [data, setData] = useState({ email: "", password: "" });

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
    <div className={`modal login ${isOpen ? "modal_visible" : ""}`}>
      <div className="modal__login">
        <p className="modal__header">Log in</p>
        <button className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="close-icon" className="modal__close-img" />
        </button>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__form-label">Email</label>
          <input
            type="email"
            className="modal__form-input"
            id="login-email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
          />
          <label className="modal__form-label">Password</label>
          <input
            type="password"
            className="modal__form-input"
            id="login-password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />
          <div className="modal__buttons">
            <button className="modal__button" type="submit">
              Log in
            </button>
            <button
              type="button"
              onClick={handleRegisterClick}
              className="modal__register-link"
            >
              or Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginModal;
