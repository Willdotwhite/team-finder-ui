import React, { useState } from "react";
import logo from "./logo.svg";
import { useQuery } from "react-query";
import "./Home.css";

export const Home: React.FC = () => {
  const [count, setCount] = useState(0);

  const { isLoading, isError, data } = useQuery(["someQuery"], async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "this data loaded asynchronously";
  });

  let loadedData: string;
  if (isLoading) {
    loadedData = "loading...";
  } else if (isError) {
    loadedData = "Error!";
  } else {
    loadedData = data!;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p className="p-5 m-5 bg-white text-black rounded ring ring-blue-300">
          {loadedData}
        </p>
        <p>
          <button onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
};
