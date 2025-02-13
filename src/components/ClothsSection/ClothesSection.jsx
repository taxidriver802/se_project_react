import { Link } from 'react-router-dom';

import React from 'react';
import ItemCard from '../ItemCard/ItemCard.jsx';
import './ClothesSection.css';

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleCustomizeClick,
}) {
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
        <Link to="/customize">
          <button
            type="button"
            className="clothes__section_custom-button"
            onClick={handleCustomizeClick}
          >
            ~W.I.P.~ Customize Your Look! ~W.I.P.~
          </button>
        </Link>
      </div>

      <ul className="clothes__section__items">
        {clothingItems.map((filteredCard) => (
          <ItemCard
            key={filteredCard._id}
            item={filteredCard}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
