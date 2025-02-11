import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import Main from "../Main/Main.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal";
import currentTempUnitContext from "../../contexts/CurrentTempUnitContext.jsx";
import Profile from "../Profile/Profile.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { f: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
    console.log(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <currentTempUnitContext.Provider
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
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="*" element={<p>ERROR: 404!1!1!1!</p>}></Route>
          </Routes>

          <Footer />
        </div>
        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
        >
          <label htmlFor="name" className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="text"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal_label modal__label_type_radio"
            >
              <input
                id="hot"
                type="radio"
                className="modal__radio-input"
                name="radioButton"
              />{" "}
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal_label modal__label_type_radio"
            >
              <input
                id="warm"
                type="radio"
                className="modal__radio-input"
                name="radioButton"
              />{" "}
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal_label modal__label_type_radio"
            >
              <input
                id="cold"
                type="radio"
                className="modal__radio-input"
                name="radioButton"
              />{" "}
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          card={selectedCard}
        />
      </div>
    </currentTempUnitContext.Provider>
  );
}

export default App;
