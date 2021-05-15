import * as React from "react";
// for some reason, removing Link here causes an error below? added this to stop ESlint complaining about the unused var, Link
// eslint-disable-next-line
import { BrowserRouter as Link, NavLink } from "react-router-dom";

export const PageNavigator: React.FC = () => (
  <div className="flex flex-row justify-center items-center my-8">
    <NavLink
      to="/"
      exact={true}
      activeClassName="text-primary font-medium underline hover:no-underline"
      className="text-2xl font-light text-white text-center mx-16 uppercase whitespace-pre hover:underline">
      Find<br />Team
    </NavLink>

    <NavLink
      to="/register"
      activeClassName="text-primary font-medium underline hover:no-underline"
      className="text-2xl font-light text-white text-center mx-16 uppercase whitespace-pre hover:underline">
      Post / Edit<br />Your Team
    </NavLink>
  </div>
);

