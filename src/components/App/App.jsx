import { useState, useEffect } from "react";

import "./App.css";
import { coordinates, APIKey } from "../../utils/constants";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeather } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal")) {
        closeActiveModal();
      }
    };

    if (activeModal) {
      document.addEventListener("keydown", handleEscapeKeyPress);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((res) => {
        const filteredData = filterWeather(res);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        isOpen={activeModal === "add-garment"}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__form-label">
          Name
        </label>
        <input
          type="text"
          className="modal__form-input"
          id="name"
          placeholder="Name"
        />
        <label htmlFor="imageURL" className="modal__form-label">
          Image
        </label>
        <input
          type="URL"
          className="modal__form-input"
          id="imageURL"
          placeholder="Image URL"
        />
        <fieldset className="modal__radio-btns">
          <legend className="modal__weather-caption">
            Select the weather type:
          </legend>
          <label className="modal__label modal__label_type_radio">
            <input
              id="hot"
              type="radio"
              className="modal__radio-input"
              name="weather_type"
            />
            Hot
          </label>
          <label className="modal__label modal__label_type_radio">
            <input
              id="warm"
              type="radio"
              className="modal__radio-input"
              name="weather_type"
            />
            Warm
          </label>
          <label className="modal__label modal__label_type_radio">
            <input
              id="cold"
              type="radio"
              className="modal__radio-input"
              name="weather_type"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
