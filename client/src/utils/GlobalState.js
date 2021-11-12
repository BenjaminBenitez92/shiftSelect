import React, { createContext, useContext } from "react";
import { useShiftReducer } from './reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useShiftReducer({
    shifts: [],
    cart: [],
    cartOpen: false,
    hospitals: [],
    currentHospital: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
