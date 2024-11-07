import "./SideBar.css";
import avatar from "../../../assets/avatar.png";

const SideBar = () => {
  return (
    <div className="sidebar">
      <img src={avatar} alt="user avatar" className="sidebar__avatar" />
      <p className="sidebar__username"> Terrence Tegegne</p>
    </div>
  );
};

export default SideBar;
