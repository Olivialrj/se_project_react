import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  handleRegisterClick,
  handleLoginClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const renderAvatar = (avatarUrl, name) => {
    if (avatarUrl) {
      return <img src={avatarUrl} alt={name} className="header__avatar" />;
    }
    const firstLetter = name ? name.charAt(0).toUpperCase() : "?";
    return <div className="header__avatar-placeholder">{firstLetter}</div>;
  };

  return (
    <header className="header">
      <div className="header__left">
        <NavLink to="/" className="test">
          <img className="header__logo" src={logo} alt="Wtwr Logo"></img>
        </NavLink>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            <NavLink to="/profile" className="test">
              <div className="header__user-container">
                <p className="header__username">{currentUser.name}</p>
                {renderAvatar(currentUser.avatarUrl, currentUser.name)}
              </div>
            </NavLink>
          </>
        ) : (
          <>
            <div className="header__authorisation">
              <button
                type="button"
                className="header__signup"
                onClick={handleRegisterClick}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="header__login"
                onClick={handleLoginClick}
              >
                Log In
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
