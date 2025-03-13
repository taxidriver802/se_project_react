import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import './SideBar.css';
import avatar from '../../assets/avatar.png';

function SideBar({onLogoutClick}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img src={avatar} alt="Default avatar" className="sidebar__avatar" />
      <p className="sidebar__username">{currentUser?.name}</p>
      <button className="change__data-button">Change profile data</button>
      <button onClick={onLogoutClick} className="logout-button">Log out</button>
    </div>
  );
}

export default SideBar;
