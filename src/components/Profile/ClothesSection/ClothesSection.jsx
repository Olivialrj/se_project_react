import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";

const ClothesSection = ({ onCardClick, clothingItems }) => {
  return (
    <div className="clothes-section">
      <div className="clothes-section__profile">
        <p>Your Items</p>
        <button className="clothes-section__add-btn">+ Add New</button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard key={item.id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
};
export default ClothesSection;
