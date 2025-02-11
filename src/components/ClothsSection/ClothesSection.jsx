import ItemCard from "../ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants";

import "./ClothesSection.css";

/* import handleCardClick from "../../utils/handleCardClick"; */

function ClothesSection(/* Pass Here !!!! */) {
  return (
    <div className="clothes__section">
      <div className="clothes__section__header">
        <p>Your Items</p>
        <button type="button">+ Add New</button>
      </div>

      <ul className="cards__list">
        {defaultClothingItems.map((filteredCard) => (
          <ItemCard
            key={filteredCard._id}
            item={filteredCard}

            /* TODO - Pass as prop */
            /* onCardClick={handleCardClick} */
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
