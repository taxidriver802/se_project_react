import ItemCard from "../ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants";

import "./ClothesSection.css";

/* import handeCardClick from "../../utils/handleCardClick"; */

function ClothesSection({ onCardClick } /* Pass Here !!!! */) {
  return (
    <div className="clothes__section">
      <div className="clothes__section__header">
        <p>Your Items</p>
        <button type="button">+ Add New</button>
      </div>

      <ul className="clothes-section__items">
        {defaultClothingItems.map((filteredCard) => (
          <ItemCard
            key={filteredCard._id}
            item={filteredCard}
            /* TODO - Pass as prop */
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
