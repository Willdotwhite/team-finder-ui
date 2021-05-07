import * as React from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

export const PageNavigator: React.FC = () => (
  <div className="flex flex-row justify-center items-center my-14">
    <NavLink to="/" exact={true} activeClassName="text-primary font-medium hover:no-underline" className="text-3xl font-light text-white text-center mx-16 uppercase whitespace-pre hover:underline">Find Team</NavLink>
    <NavLink to="/Register" activeClassName="text-primary font-medium hover:no-underline" className="text-3xl font-light text-white text-center mx-16 uppercase whitespace-pre hover:underline">Register / Edit{"\n"}Team</NavLink>
  </div>
);

