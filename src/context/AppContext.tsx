import { createContext, useContext, useState } from "react";
import { IBranch, IReservation, IRestaurant, ITable } from "../pages/types";

const AppContext = createContext<{
  appData: {
    branches: IBranch[];
    restaurants: IRestaurant[];
    tables: ITable[];
    reservation: IReservation[];
  };
  setAppData: React.Dispatch<
    React.SetStateAction<{
      branches: IBranch[];
      restaurants: IRestaurant[];
      tables: ITable[];
      reservation: IReservation[];
    }>
  >;
}>({
  appData: {
    branches: [],
    restaurants: [],
    tables: [],
    reservation: [],
  },
  setAppData: null,
});

export const AppProvider = ({ children }) => {
  const [appData, setAppData] = useState({
    branches: [],
    restaurants: [],
    tables: [],
    reservation: [],
  });

  return (
    <AppContext.Provider value={{ appData, setAppData }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppData = () => useContext(AppContext);
