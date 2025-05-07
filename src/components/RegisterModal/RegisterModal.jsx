import { useState, useRef } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  onCloseModal,
  handleRegistration,
  isOpen,
  handleLoginClick,
}) => {
  const initialFormState = {
    email: "",
    password: "",
    name: "",
    avatar: "",
  };

  const [data, setData] = useState(initialFormState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  const resetForm = () => {
    setData(initialFormState);
    setPreviewUrl("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    if (!data.email) {
      setError("Please enter your email");
      return false;
    }
    if (!data.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!data.password) {
      setError("Please enter a password");
      return false;
    }
    if (data.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (!data.name) {
      setError("Please enter your name");
      return false;
    }
    if (!data.avatarUrl) {
      setError("Please select an avatar image");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const key = id.replace("register-", "");
    setData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    setError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setData((prev) => ({
          ...prev,
          avatarUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await handleRegistration(data);
      resetForm();
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onCloseModal();
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText={isSubmitting ? "Signing up..." : "Sign Up"}
      isOpen={isOpen}
      onClose={handleClose}
      handleSubmit={handleSubmit}
    >
      {error && <div className="modal__error">{error}</div>}
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
        disabled={isSubmitting}
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
        disabled={isSubmitting}
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
        required
        disabled={isSubmitting}
      />
      <label htmlFor="register-avatar" className="modal__form-label">
        Avatar *
      </label>
      <div className="modal__avatar-upload">
        <input
          type="file"
          className="modal__file-input"
          id="register-avatar"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          disabled={isSubmitting}
        />
        <button
          type="button"
          className="modal__upload-button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isSubmitting}
        >
          Choose File
        </button>
        {previewUrl && (
          <div className="modal__preview">
            <img
              src={previewUrl}
              alt="Avatar preview"
              className="modal__preview-image"
            />
          </div>
        )}
      </div>
      <div className="modal__buttons">
        <button
          type="button"
          onClick={handleLoginClick}
          className="modal__login-link"
          disabled={isSubmitting}
        >
          or Log in
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
