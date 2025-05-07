import { useContext } from "react";
import "./SideBar.css";
import avatar from "../../../assets/avatar.png";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

const SideBar = ({ handleEditProfileClick, handleLogout }) => {
  const currentUser = useContext(CurrentUserContext);

  const renderAvatar = (avatar, name) => {
    if (avatar) {
      return <img src={avatar} alt={name} className="sidebar__avatar" />;
    }
    const firstLetter = name ? name.charAt(0).toUpperCase() : "?";
    return <div className="sidebar__avatar-placeholder">{firstLetter}</div>;
  };
  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        {renderAvatar(currentUser.avatar, currentUser.name)}
        <p className="sidebar__username"> {currentUser.name}</p>
      </div>
      <button
        type="button"
        className="sidebar__update-profile"
        onClick={handleEditProfileClick}
      >
        Change profile data
      </button>
      <button type="submit" onClick={handleLogout} className="sidebar__logout">
        Log out
      </button>
    </div>
  );
};

export default SideBar;
