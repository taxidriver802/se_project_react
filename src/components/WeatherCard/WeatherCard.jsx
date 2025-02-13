import { useContext } from "react";

import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext.jsx";

function WeatherCard({ weatherData }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  const filteredOption = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOption.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOption[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTempUnit]}°{currentTempUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`Card showing that it is ${weatherOption?.day ? "day" : "night"}-time with ${weatherOption?.condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
