import { createContext } from "react";
import { doctors } from "../assets/assets/assets_frontend/assets";

export const AppContext = createContext();

const currency = "$"

const AppContextProvider = (props) => {
  const value = {
    doctors,
    currency
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
