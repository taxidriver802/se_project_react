import { useContext } from "react";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext.jsx";
import "./ToggleSwitch.css";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTempUnit } = useContext(
    CurrentTempUnitContext,
  );

  return (
    <label className="toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle-switch__checkbox"
      />
      <span className="toggle-switch__slider" />
      <span
        className={`toggle-switch__text toggle-switch__text_F ${currentTempUnit === "F" ? "toggle-switch__text_color_white" : ""}`}
      >
        F
      </span>
      <span
        className={`toggle-switch__text toggle-switch__text_C ${currentTempUnit === "C" ? "toggle-switch__text_color_white" : ""}`}
      >
        C
      </span>
    </label>
  );
}
