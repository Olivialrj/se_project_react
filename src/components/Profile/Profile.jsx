import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

function Profile({
  handleCardClick,
  handleCardLike,
  clothingItems,
  handleAddItemModal,
  handleEditProfileClick,
  handleLogout,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileClick={handleEditProfileClick}
          handleLogout={handleLogout}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          handleAddItemModal={handleAddItemModal}
          handleCardLike={handleCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
