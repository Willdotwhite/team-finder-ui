import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";

export const Routes: React.FC = () => (
  <Switch>
    <Route exact={true} path="/">
      <Home />
    </Route>
  </Switch>
);
