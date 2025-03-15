import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import './ItemCard.css';
import likeInactive from '../../images/like-inactive.svg';
import likeActive from '../../images/like-active.svg';

function ItemCard({ item, onCardClick, onCardLike }) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };
  const isLiked = item.likes?.some((id) => id === currentUser._id);
  const handleLikeClick = () => {
    onCardLike({ _id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">{item.name}</h2>
        {isLoggedIn && (
          <button
            type="button"
            className="card__like-button"
            onClick={handleLikeClick}
          >
            <img src={isLiked ? likeActive : likeInactive} alt="like button" />
          </button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;
