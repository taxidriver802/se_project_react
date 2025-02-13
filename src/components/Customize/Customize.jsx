import './Customize.css';
import CustomSideBar from '../CustomSideBar/CustomSideBar';
import ClothesSection from '../ClothsSection/ClothesSection';

function Customize({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCustomizeClick,
}) {
  return (
    <div className="customize">
      <CustomSideBar clothingItems={clothingItems} />
      <div className="customize__clothes_section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          handleCustomizeClick={onCustomizeClick}
        />
      </div>
    </div>
  );
}

export default Customize;
