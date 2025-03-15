import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import './SideBar.css';
import avatar from '../../assets/avatar.png';

function SideBar({ onLogoutClick, onEditProfileClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user_info">
        <img
          src={currentUser?.avatar}
          alt="Default avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          type="button"
          onClick={onEditProfileClick}
          className="sidebar__change_data-button"
        >
          Change profile data
        </button>
        <button
          type="button"
          onClick={onLogoutClick}
          className="sidebar__logout-button"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
