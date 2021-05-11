import * as React from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

{/* TODO: Replace placehodlers with Discord data, check if the user is logged in*/}

export const PageUserInfo: React.FC = () => (
  <div className="text-center">
    {/* Profile UI, placeholder data */}
    <div className="inline-flex flex-row justify-center items-center p-5 border">
      <img style={{height: "90px", width: "90px"}} className="object-cover rounded-full ring-4 ring-primary" src={"TestUser.jpg"}></img>
      <div className="flex flex-col justify-center">
        <div className="flex flex-row mb-2">
          <h1 className="text-white font-bold text-lg text-left mx-6">Mark Brown#1234</h1>
          <NavLink to="/" className="text-white text-right ml-6 hover:underline hover:cursor-pointer">Log Out</NavLink>
        </div>
        <h1 className="text-white text-center mx-6">Team Status:</h1>
        <h1 className="text-white text-center mx-6">No Team Registered</h1>
      </div>
    </div>
    {/*Login prompt, replace above when user isn't logged in */}
    {/*<NavLink to="/Register" className="inline-block text-white text-3xl mt-8 mb-2 w-auto hover:underline">Log In{"\n"}</NavLink>
    <div className="text-white">if you want to register a Team</div>*/}
  </div>
);
