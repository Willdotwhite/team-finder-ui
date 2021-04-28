import React from "react";
import ReactDOM from "react-dom";
import { Context } from "./Context";
import "./index.css";
import { Routes } from "./Routes";

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <Routes />
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
