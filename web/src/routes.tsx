import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Mural from "./pages/Mural";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Mural} />
    </BrowserRouter>
  );
};

export default Routes;
