import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Register } from "./pages/Register/Register";

export const Routes: React.FC = () => (
  <Switch>
    <Route exact={true} path="/">
      <Home />
    </Route>
    <Route exact={true} path="/register">
      <Register />
    </Route>
  </Switch>
);
