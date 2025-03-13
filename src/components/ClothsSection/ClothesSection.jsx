import React from 'react';
import { useContext } from 'react';

import ItemCard from '../ItemCard/ItemCard.jsx';
import './ClothesSection.css';

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes__section">
      <div className="clothes__section__header">
        <p className="clothes__section__title">Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes__section-button"
        >
          + Add New
        </button>
      </div>

      <ul className="clothes__section__items">
        {clothingItems.map(
          (filteredCard) =>
            filteredCard.owner === currentUser._id && (
              <ItemCard
                key={filteredCard._id}
                item={filteredCard}
                onCardClick={onCardClick}
              />
            )
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
