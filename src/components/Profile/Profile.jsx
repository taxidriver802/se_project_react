import ClothesSection from "../ClothsSection/ClothesSection.jsx";
import SideBar from "../SideBar/SideBar";

import "./Profile.css";

function Profile() {
  return (
    <div className="profile">
      <section className="profile__sidebar-section">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection />
      </section>
    </div>
  );
}

export default Profile;
