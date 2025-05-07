import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import {
  defaultCoordinates,
  getUserLocation,
  APIKey,
} from "../../utils/constants";
import Main from "../Main/Main";
import Header from "../Header/Header";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import DeleteModal from "../DeleteModal/DeleteModal";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { getWeather, filterWeather } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { getToken, removeToken, setToken } from "../../utils/token";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [userLocation, setUserLocation] = useState(defaultCoordinates);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState(`F`);
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userData, setUserData] = useState({ email: "", password: "" });
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleRegisterClick = () => {
    setActiveModal("register");
  };
  const handleLoginClick = () => {
    setActiveModal("login");
  };
  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
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
    api
      .postItems({ name, imageUrl, weather })
      .then((newItem) => {
        // Update the clothingItems array with the new item
        // setClothingItems([newItem, ...clothingItems]);
        setClothingItems((prevItems) => [newItem.data, ...prevItems]);
        console.log(clothingItems);
        console.log(newItem);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleEditProfile = (updatedData) => {
    api
      .editProfile(updatedData)
      .then((newUserData) => {
        console.log(newUserData);
        setCurrentUser(newUserData);
        console.log(newUserData);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = () => {
    api
      .deleteItems(selectedItemId)
      .then(() => {
        setClothingItems((previousItems) =>
          previousItems.filter((item) => item._id !== selectedItemId)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegistration = ({ email, password, name, avatar }) => {
    // Convert the base64 image data to a Blob
    const imageBlob = dataURLtoBlob(avatar);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("avatar", imageBlob, "avatar.jpg");

    return auth
      .register(formData)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Registration error:", error);
        console.log("Registration attempt with data:", {
          email,
          password: "***",
          name,
          avatar: "Image data",
        });
        throw error;
      });
  };

  // Helper function to convert base64 to Blob
  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorisation(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setCurrentUser(data.user);
          setIsLoggedIn(true);
          closeActiveModal();
        }
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    console.log("testing");
    !isLiked
      ? api
          .addCardLike(id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(id)
          .then((updatedCard) => {
            console.log(clothingItems, updatedCard);
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
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
    // Get user's location when component mounts
    getUserLocation().then((coords) => {
      setUserLocation(coords);
    });
  }, []);

  useEffect(() => {
    // Update weather data when user location changes
    getWeather(userLocation, APIKey)
      .then((res) => {
        const filteredData = filterWeather(res);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, [userLocation]);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    api
      .checkToken(jwt)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      handleCardLike={handleCardLike}
                      clothingItems={clothingItems}
                      handleAddItemModal={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      handleEditProfile={handleEditProfile}
                      handleLogout={handleLogout}
                    />
                  </ProtectedRoute>
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
            isOpen={activeModal === "delete-modal"}
            onClose={closeActiveModal}
            handleDeleteItem={handleDeleteItem}
          />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onCloseModal={closeActiveModal}
            onAddItem={handleAddItemSubmit}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onCloseModal={closeActiveModal}
            handleRegistration={handleRegistration}
            handleLoginClick={handleLoginClick}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onCloseModal={closeActiveModal}
            handleLogin={handleLogin}
            handleRegisterClick={handleRegisterClick}
          />
          <EditProfileModal
            handleEditProfile={handleEditProfile}
            onCloseModal={closeActiveModal}
            isOpen={activeModal === "edit-profile"}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
