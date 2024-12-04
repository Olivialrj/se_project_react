import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";
import CurrentUserContext from "../../../contexts/ CurrentUserContext";
import { useContext } from "react";

const ClothesSection = ({
  handleAddItemModal,
  handleCardLike,
  handleCardClick,
  clothingItems,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const userClothingItems = clothingItems.filter((item) => {
    return item.owner._id === currentUser._id;
  });

  console.log("UCI:", userClothingItems);

  return (
    <div className="clothes-section">
      <div className="clothes-section__profile">
        <p>Your Items</p>
        <button
          className="clothes-section__add-btn"
          onClick={handleAddItemModal}
        >
          + Add New
        </button>
      </div>
      {userClothingItems.length === 0 ? (
        <p>No items added by you yet.</p>
      ) : (
        <ul className="clothes-section__items">
          {userClothingItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              handleCardLike={handleCardLike}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
export default ClothesSection;
