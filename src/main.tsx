import "focus-visible";
import React from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import { ReactQueryDevtools } from 'react-query/devtools'
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { Context } from "./Context";
import { Routes } from "./Routes";
import { PageNavigator } from "./components/PageNavigator";
import { PageContainer } from "./components/PageContainer";
import { StatusMessenger } from "./components/StatusMessenger";

import "tailwindcss/tailwind.css";
import "./index.css";

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],

    tracesSampleRate: 0.2,
  })
}

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
      <StatusMessenger />
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);