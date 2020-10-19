import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../../utils/Login";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/admin" />
      }
    />
  );
};

export default PrivateRoute;
