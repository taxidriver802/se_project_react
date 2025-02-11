import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import "../../vendor/fonts.css";
import "./Main.css";

import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import currentTempUnitContext from "../../contexts/CurrentTempUnitContext.jsx";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, handleCardClick }) {
  const { currentTempUnit } = useContext(currentTempUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTempUnit]}°{currentTempUnit} / You
          may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
