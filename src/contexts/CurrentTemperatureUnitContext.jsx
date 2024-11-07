import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "",
  handleToggleSwtichChange: () => {},
});

export { CurrentTemperatureUnitContext };
