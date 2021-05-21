import * as React from "react";
import { NavLink } from "react-router-dom";

export const PageNavigator: React.FC = () => (
  <div className="flex flex-row justify-center items-center space-x-4 my-8 border-b border-white">
    <NavLink
      to="/"
      exact={true}
      activeClassName="text-primary font-medium"
      activeStyle={{transform: "translate(0px, 1px)"}}
      className="leading-tight text-2xl font-light bg-black py-3 px-12 text-white text-center uppercase whitespace-pre rounded-t-lg border-t border-l border-r"
      >
      Team<br />Finder
    </NavLink>

    <NavLink
      to="/register"
      activeClassName="text-primary font-medium"
      activeStyle={{transform: "translate(0px, 1px)"}}
      className="leading-tight text-2xl font-light bg-black py-3 px-7 text-white text-center uppercase whitespace-pre rounded-t-lg border-t border-l border-r"
      >
      <div>Post / Edit<br />Your Team</div>
    </NavLink>
    
    <NavLink
      to="/about"
      exact={true}
      activeClassName="text-primary font-medium"
      activeStyle={{transform: "translate(0px, 1px)"}}
      className="leading-tight text-2xl font-light bg-black py-3 px-12 text-white text-center uppercase whitespace-pre rounded-t-lg border-t border-l border-r"
      >
      FAQ /<br />
      About
    </NavLink>
  </div>
);

