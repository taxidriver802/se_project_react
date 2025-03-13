import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Main from '../Main/Main.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import ItemModal from '../ItemModal/ItemModal';
import CurrentTempUnitContext from '../../contexts/CurrentTempUnitContext.jsx';
import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';
import Profile from '../Profile/Profile.jsx';

import AddItemModal from '../AddItemModal/AddItemModal.jsx';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal.jsx';
import LoginModal from '../LoginModal/LoginModal.jsx';
import RegisterModal from '../RegisterModal/RegisterModal.jsx';
import {
  APIkey,
  coordinates,
  defaultClothingItems,
} from '../../utils/constants.js';
import { getItems, addItem, deleteItem } from '../../utils/api.js';
import { getWeather, filterWeatherData } from '../../utils/weatherApi.js';
import { signin, signup, checkToken } from '../../utils/auth.js';

import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { f: 999, C: 999 },
    city: '',
    condition: '',
    isDay: true,
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState('F');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === 'F' ? 'C' : 'F');
  };

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  const closeActiveModal = () => {
    setActiveModal('');
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      checkToken(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
          }
        })
        .catch((err) => console.error('Token check error:', err));
    }
  }, []);

  useEffect(() => {
    const handleOverlay = (e) => {
      if (e.target.classList.contains('modal')) {
        closeActiveModal();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeActiveModal();
      }
    };

    document.addEventListener('mousedown', handleOverlay);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOverlay);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activeModal, closeActiveModal]);

  const deleteConfirmation = () => {
    setActiveModal('delete-confirmation');
  };

  const handleDeleteClickApi = () => {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch((err) => console.error('Error deleting item:', err));
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    setIsLoading(true);
    addItem({ name, imageUrl, weather })
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => console.error('Error adding item:', err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        if (Array.isArray(data)) {
          const reversedData = data.reverse();
          setClothingItems(reversedData);
        } else {
          console.error('Expected data to be an array:', data);
        }
      })
      .catch((err) => {
        console.error('Error fetching items:', err);
      });
  }, []);

  const handleUserRegister = ({ email, password, name, avatar }) => {
    setIsLoading(true);
    signup(email, password, name, avatar)
      .then((res) => {
        if (res) {
          handleUserLogin({ email, password });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const handleUserLogin = (values) => {
    setIsLoading(true);
    signin(values.email, values.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          setCurrentUser(res);
          setIsLoginModalOpen(false);
          navigate('/');
        }
      })
      .catch((err) => console.error('Login error:', err))
      .finally(() => setIsLoading(false));
  };
  const handleSignUpClick = () => {
    setIsRegisterModalOpen(true);
  };

  const handleLogInClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogOutClick = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate('/');
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onSignUpClick={handleSignUpClick}
              onLogInClick={handleLogInClick}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                exact
                path="/profile"
                element={
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    onLogout={handleLogOutClick}
                  />
                }
              />
              <Route
                path="*"
                element={
                  <p>
                    This page is not currently available, Please check your URL
                    and try again.
                  </p>
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === 'add-garment'}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
            isLoading={isLoading}
          />
          <ItemModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            card={selectedCard}
            handleDeleteConfirmation={deleteConfirmation}
          />
          {activeModal === 'delete-confirmation' && (
            <DeleteConfirmationModal
              handleDeleteItem={handleDeleteClickApi}
              activeModal={activeModal}
              onClose={closeActiveModal}
            />
          )}
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={() => setIsRegisterModalOpen(false)}
            onRegister={handleUserRegister}
            isLoading={isLoading}
          />
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onLogin={handleUserLogin}
            isLoading={isLoading}
          />
        </div>
      </CurrentTempUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
