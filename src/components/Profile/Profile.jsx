import ClothesSection from '../ClothsSection/ClothesSection.jsx';
import SideBar from '../SideBar/SideBar';

import './Profile.css';

function Profile({ onCardClick, clothingItems, handleAddClick, onLogout }) {
  return (
    <div className="profile">
      <section className="profile__sidebar-section">
        <SideBar onLogoutClick={onLogout} />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
