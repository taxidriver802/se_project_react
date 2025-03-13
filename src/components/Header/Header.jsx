import { Link } from 'react-router-dom';
import { useContext } from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';

import './Header.css';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.png';
import ToggleSwitch from '../toggleSwitch/toggleSwitch';

function Header({ handleAddClick, weatherData, onSignUpClick, onLogInClick }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {currentUser && (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__clothes-button"
        >
          + Add clothes
        </button>
      )}

      <div className="header__user-container">
        {currentUser ? (
          <Link to="/profile" className="header__link">
            <p className="header__username">{currentUser.name}</p>
            <img
              src={avatar}
              alt={currentUser.name}
              className="header__avatar"
            />
          </Link>
        ) : (
          <div className="header__auth-buttons">
            <button onClick={onSignUpClick} className="header__button">
              Sign Up
            </button>
            <button onClick={onLogInClick} className="header__button">
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
