import ClothesSection from '../ClothesSection/ClothesSection.jsx';
import SideBar from '../SideBar/SideBar';

import './Profile.css';

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  onLogout,
  onProfileEdit,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar-section">
        <SideBar onLogoutClick={onLogout} onEditProfileClick={onProfileEdit} />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
