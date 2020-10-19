import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../../utils/Login';

const RestrictRoute = ({component: Component, ...rest}: any) => {
  return (
    <Route {...rest} render={props => (
      isLogin() ?
        <Redirect to="/admin/announces" />
      : <Component {...props} />
    )} />
  );
};

export default RestrictRoute;