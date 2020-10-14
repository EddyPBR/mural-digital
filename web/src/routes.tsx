import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Mural from "./pages/Mural";
import Announce from "./pages/Announce";
import Admin from "./pages/Admin";
import AdminAnnounces from "./pages/AdminAnnounces";
import AddAnnounce from "./pages/AddAnnounce";
import UpdateAnnounce from "./pages/UpdateAnnounce";

import Footer from "./components/Footer";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Mural} />
      <Route path="/announces/:id" exact component={Announce} />
      <Route path="/admin/" exact component={Admin} />
      <Route path="/admin/announces" exact component={AdminAnnounces} />
      <Route path="/admin/announces/add" exact component={AddAnnounce} />
      <Route path="/admin/announces/update/:id" exact component={UpdateAnnounce} />
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
