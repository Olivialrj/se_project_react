import { useContext } from "react";
import CurrentUserContext from "../../contexts/ CurrentUserContext";
import "./ItemCard.css";
// import likebtn from "../../assets/Like button.png";
// import likedbtn from "../../assets/Liked-icon.png";

function ItemCard({ item, onCardClick, handleCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked = item.likes.some((like) => like === currentUser?._id);

  const handleLike = () => {
    handleCardLike({ id: item._id, isLiked });
  };
  return (
    <li className="card">
      <div className="card__icons">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <button
            className={`card__like-button ${
              isLiked ? "card__like-button_active" : ""
            }`}
            onClick={handleLike}
          >
            {/* {isLiked ? "Unlike" : "Like"} */}
          </button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
