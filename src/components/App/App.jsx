import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from '../Main/Main.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import ItemModal from '../ItemModal/ItemModal';
import CurrentTempUnitContext from '../../contexts/CurrentTempUnitContext.jsx';
import Profile from '../Profile/Profile.jsx';

import AddItemModal from '../AddItemModal/AddItemModal.jsx';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal.jsx';
import {
  APIkey,
  coordinates,
  defaultClothingItems,
} from '../../utils/constants.js';
import { getItems, addItem, deleteItem } from '../../utils/api.js';
import { getWeather, filterWeatherData } from '../../utils/weatherApi.js';
/* import ClothesSection from '../ClothsSection/ClothesSection.jsx'; */
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
      .catch(console.error);
  }, []);

  return (
    <CurrentTempUnitContext.Provider
      value={{ currentTempUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

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
                />
              }
            />
            {/*  */}
            <Route path="*" element={<p>ERROR: 404!1!1!1!</p>} />
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
      </div>
    </CurrentTempUnitContext.Provider>
  );
}

export default App;
