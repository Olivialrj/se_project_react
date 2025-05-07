import { useState, useContext, useRef, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";
import closeIcon from "../../assets/closeicon.svg";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({ handleEditProfile, onCloseModal, isOpen }) => {
  const initialFormState = {
    name: "",
    avatar: "",
  };
  const currentUser = useContext(CurrentUserContext);
  const [data, setData] = useState(initialFormState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setData({
        name: currentUser.name || "",
        avatarUrl: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser]);

  const resetForm = () => {
    setData(initialFormState);
    setPreviewUrl("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await handleEditProfile(data);
      resetForm();
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message || "Update failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
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
      <label htmlFor="update-name" className="modal__form-label">
        Name *
      </label>
      <input
        type="name"
        className="modal__form-input"
        id="update-name"
        placeholder="Name"
        value={data.name}
        onChange={handleChange}
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
      {/* <button className="modal__button" type="submit">
          Save changes
        </button> */}
    </ModalWithForm>
  );
};

export default EditProfileModal;
