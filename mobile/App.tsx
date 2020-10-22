import React from "react";
import { enableScreens } from "react-native-screens";

import { StatusBar } from "expo-status-bar";

import Routes from "./src/routes";

const App: React.FC = () => {
  enableScreens();

  return (
    <>
      <StatusBar style="light" backgroundColor="#E32F34" translucent />
      <Routes />
    </>
  );
};

export default App;
