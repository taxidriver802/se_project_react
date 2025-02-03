import { useState } from "react";

import './App.css'
import Main from '../Main/Main.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";


function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState("");

  const handleAddClick = () => {
    setActiveModal("add-garment");
  }

  return (
  <div className="page">
    <div className="page__content">
      <Header handleAddClick={handleAddClick}/>
      <Main weatherData={weatherData}/>
      <Footer />
    </div>
    <ModalWithForm title="New garment" buttonText="Add garment" activeModal={activeModal}>
    <label htmlFor="name" className="modal__label">
                Name
            <input type="text" className="modal__input" id="name" placeholder="Name"/>
            </label>
            <label htmlFor="imageUrl" className="modal__label">
                Image{" "}
            <input type="text" className="modal__input" id="imageUrl" placeholder="Image URL"/>
            </label>
            <fieldset className="modal__radio-buttons">
                <legend className="modal__legend">
                    Select the weather type:
                </legend>
                <label htmlFor="hot" className="modal_label modal__label_type_radio">
                    <input id="hot" type="radio" className="modal__radio-input" /> Hot
                </label>
                <label htmlFor="warm" className="modal_label modal__label_type_radio">
                    <input id="warm" type="radio" className="modal__radio-input" /> Warm
                </label>
                <label htmlFor="cold" className="modal_label modal__label_type_radio">
                    <input id="cold" type="radio" className="modal__radio-input" /> Cold
                </label>
            </fieldset>
    </ModalWithForm>
  </div>
  );
}

export default App
