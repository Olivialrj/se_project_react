import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIKey } from "../../utils/constants";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import DeleteModal from "../DeleteModal/DeleteModal";
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
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState(`F`);
  const [clothingItems, setClothingItems] = useState([]);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const openConfirmationModal = (itemId) => {
    console.log("Opening delete confirmation modal for item ID:", itemId);
    setSelectedItemId(itemId);
    setActiveModal("delete-modal");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedItemId(null);
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
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleDeleteItem = () => {
    deleteItems(selectedItemId)
      .then(() => {
        setClothingItems((previousItems) =>
          previousItems.filter((item) => item._id !== selectedItemId)
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
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
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
                  handleAddItemModal={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          openConfirmationModal={openConfirmationModal}
        />
        <DeleteModal
          onClose={closeActiveModal}
          handleDeleteItem={handleDeleteItem}
          isOpen={activeModal === "delete-modal"}
        />
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onCloseModal={closeActiveModal}
          onAddItem={handleAddItemSubmit}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
