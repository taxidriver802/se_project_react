import ItemCard from "../ItemCard/ItemCard.jsx";

import "./ClothesSection.css";

/* import handeCardClick from "../../utils/handleCardClick"; */

function ClothesSection({ onCardClick, clothingItems }) {
  return (
    <div className="clothes__section">
      <div className="clothes__section__header">
        <p className="clothes__section__title">Your Items</p>
        <button type="button" className="clothes__section-button">
          + Add New
        </button>
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
