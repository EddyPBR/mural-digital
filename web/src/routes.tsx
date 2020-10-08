import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Mural from "./pages/Mural";
import Announce from "./pages/Announce";
import Admin from "./pages/Admin";

import Footer from "./components/Footer";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Mural} />
      <Route path="/announces/:id" exact component={Announce} />
      <Route path="/admin/" exact component={Admin} />
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
