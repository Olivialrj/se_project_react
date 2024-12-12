import { useEffect, useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);
  const handleWeatherChange = (e) => setWeather(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", { name, imageUrl, weather });
    onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      handleSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__form-label">
        Name
      </label>
      <input
        type="text"
        className="modal__form-input"
        id="name"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />

      <label htmlFor="imageURL" className="modal__form-label">
        Image
      </label>
      <input
        type="url"
        className="modal__form-input"
        id="imageURL"
        placeholder="Image URL"
        value={imageUrl}
        onChange={handleImageUrlChange}
      />

      <fieldset className="modal__radio-btns">
        <label className="modal__weather-caption" htmlFor="weather-hot">
          Select the weather type:
        </label>
        {["Hot", "Warm", "Cold"].map((type) => (
          <label
            htmlFor={`weather-${type.toLowerCase()}`}
            key={type}
            className="modal__label modal__label_type_radio"
          >
            {/* {" "} */}
            <input
              type="radio"
              className="modal__radio-input"
              id={`weather-${type.toLowerCase()}`}
              name="weather_type"
              value={type.toLowerCase()}
              checked={weather === type.toLowerCase()}
              onChange={handleWeatherChange}
            />
            {type}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
