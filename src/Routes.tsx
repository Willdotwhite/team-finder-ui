import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login"
import { Logout } from "./pages/Login/Logout"
import { AuthorizedCallback } from "./pages/Login/AuthorizedCallback";

export const Routes: React.FC = () => (
  <Switch>
    <Route exact={true} path="/">
      <Home />
    </Route>
    <Route exact={true} path="/register">
      <Register />
    </Route>
    <Route exact={true} path="/login">
      <Login />
    </Route>
    <Route exact={true} path="/logout">
      <Logout />
    </Route>
    <Route exact={true} path="/login/failed">
    </Route>
    <Route exact={true} path="/login/authorized">
      <AuthorizedCallback />
    </Route>
  </Switch>
);
