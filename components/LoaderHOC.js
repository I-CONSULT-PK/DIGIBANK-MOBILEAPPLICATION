import React, { useState } from "react";
import LoaderComponent from "./LoaderComponent";

export const AppLoaderContext = React.createContext();

export const LoaderHOC = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const showLoader = () => {
    setVisible(true);
  };

  const hideLoader = () => {
    setVisible(false);
  };

  return (
    <AppLoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      <LoaderComponent visible={visible} />
    </AppLoaderContext.Provider>
  );
};
