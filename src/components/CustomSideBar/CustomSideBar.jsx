import './CustomSideBar.css';
import CustomSideBarImages from '../CustomSideBarImages/CustomSideBarImages';

function CustomSideBar({ clothingItems }) {
  return (
    <div className="custom-side-bar">
      <div className="custom-side-bar_title">
        <p className="custom-side-bar__title-text">Customize your look:</p>
        <CustomSideBarImages clothingItems={clothingItems} />
      </div>
    </div>
  );
}

export default CustomSideBar;
