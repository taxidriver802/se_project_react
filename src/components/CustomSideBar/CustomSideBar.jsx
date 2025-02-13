import './CustomSideBar.css';
import CustomSideBarImages from '../CustomSideBarImages/CustomSideBarImages';

function CustomSideBar({ clothingItems }) {
  return (
    <div className="custom-side-bar">
      <div className="custom-side-bar_title">
        <CustomSideBarImages clothingItems={clothingItems} />
      </div>
    </div>
  );
}

export default CustomSideBar;
