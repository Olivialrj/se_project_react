import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIKey } from "../../utils/constants";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeather } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { getItems, deleteItems, postItems } from "../../utils/api";
import AddItemModal from "../AddItemModal/AddItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState(`F`);
  const [clothingItems, setClothingItems] = useState([]);
  // const [name, setName] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  // const [weather, setWeather] = useState("");
  // const handleWeatherChange = (e) => setWeather(e.target.value);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleAddClickItem = () => {
    setActiveModal("add-item");
  };
  const handleProfileClick = () => {
    setActiveModal("profile-modal");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    postItems({ name, imageUrl, weather })
      .then((newItem) => {
        // Update the clothingItems array with the new item
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (id) => {
    deleteItems(id)
      .then(() => {
        setClothingItems((previousItems) =>
          previousItems.filter((item) => item._id !== id)
        );
        closeActiveModal();
      })
      .catch(console.error);
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

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            handleProfileClick={handleProfileClick}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddItemModal={handleAddClickItem}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          handleAddItemSubmit={handleAddItemSubmit}
        >
          <label htmlFor="name" className="modal__form-label">
            Name
          </label>
          <input
            type="text"
            className="modal__form-input"
            id="name"
            placeholder="Name"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="imageURL" className="modal__form-label">
            Image
          </label>
          <input
            type="URL"
            className="modal__form-input"
            id="imageURL"
            placeholder="Image URL"
            // value={imageUrl}
            // onChange={(e) => setImageUrl(e.target.value)}
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
                value="hot"
                // checked={weather === "hot"}
                // onChange={handleWeatherChange}
              />
              Hot
            </label>
            <label className="modal__label modal__label_type_radio">
              <input
                id="warm"
                type="radio"
                className="modal__radio-input"
                name="weather_type"
                value="warm"
                // checked={weather === "warm"}
                // onChange={handleWeatherChange}
              />
              Warm
            </label>
            <label className="modal__label modal__label_type_radio">
              <input
                id="cold"
                type="radio"
                className="modal__radio-input"
                name="weather_type"
                value="cold"
                // checked={weather === "cold"}
                // onChange={handleWeatherChange}
              />
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onDeleteItem={handleDeleteItem}
        />
        <AddItemModal
          isOpen={activeModal === "add-item"}
          onCloseModal={closeActiveModal}
          onAddItem={handleAddItemSubmit}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
