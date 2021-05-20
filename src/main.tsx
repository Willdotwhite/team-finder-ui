import "focus-visible";
import React from "react";
import ReactDOM from "react-dom";
import { Context } from "./Context";
import { ReactQueryDevtools } from 'react-query/devtools'
import { Routes } from "./Routes";
import "tailwindcss/tailwind.css";
import "./index.css";
import { PageUserInfo } from "./components/PageUserInfo";
import { PageNavigator } from "./components/PageNavigator";
import { NavLink } from "react-router-dom";
import { PageContainer } from "./components/PageContainer";

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <PageContainer>
        <NavLink to="/">
          <div className="text-center">
            {/* TODO: Resize and optimise this image before launch */}
            <img
              className="inline-block my-6"
              src="/MainLogo100px.png"
              width={318}
              height={100}
              alt="GMTK Game Jam 2021 - Team Finder"
            />
          </div>
        </NavLink>
        <PageNavigator/>
        <Routes />
      </PageContainer>
      <ReactQueryDevtools />
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
