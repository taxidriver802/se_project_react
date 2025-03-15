import { Link } from 'react-router-dom';
import { useContext } from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';

import './Header.css';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.png';
import ToggleSwitch from '../toggleSwitch/toggleSwitch';

function Header({ handleAddClick, weatherData, onSignUpClick, onLogInClick }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  // Helper function to get ordinal suffix
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  // Get the current date components
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const day = today.getDate();
  const suffix = getOrdinalSuffix(day);

  // Format the date with the ordinal suffix
  const currentDate = `${month} ${day}<sup>${suffix}</sup>`;

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </Link>
      <p className="header__date-location">
        <span dangerouslySetInnerHTML={{ __html: currentDate }}></span>,{' '}
        {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn && (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__clothes-button"
        >
          + Add clothes
        </button>
      )}

      <div className="header__user-container">
        {isLoggedIn ? (
          <Link to="/profile" className="header__link">
            <p className="header__username">{currentUser?.name}</p>
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
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
