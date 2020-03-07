import { useContext, createContext } from 'react';

export const AppContext = createContext({
  zoom: 75,
  top: null,
  mouse: null
});

export const useAppContext = () => useContext(AppContext);

export default AppContext;
