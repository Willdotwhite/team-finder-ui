import React from "react";
import ReactDOM from "react-dom";
import { Context } from "./Context";
import { Routes } from "./Routes";
import "tailwindcss/tailwind.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <Routes />
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
