import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Footer from "./components/Footer";
import RestrictRoute from "./components/RestrictRoute";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Announce from "./pages/Announce";
import Admin from "./pages/Admin";
import AdminAnnounces from "./pages/AdminAnnounces";
import AddAnnounce from "./pages/AddAnnounce";
import UpdateAnnounce from "./pages/UpdateAnnounce";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/announces/:id" exact component={Announce} />
        <RestrictRoute path="/admin" exact component={Admin} />
        <PrivateRoute path="/admin/announces" exact component={AdminAnnounces} />
        <PrivateRoute path="/admin/announces/add" exact component={AddAnnounce} />
        <PrivateRoute path="/admin/announces/update/:id" exact component={UpdateAnnounce} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
