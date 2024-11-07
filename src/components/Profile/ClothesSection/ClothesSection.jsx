import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";

const ClothesSection = ({
  handleAddItemModal,
  handleCardClick,
  clothingItems,
}) => {
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
      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
        ))}
      </ul>
    </div>
  );
};
export default ClothesSection;
