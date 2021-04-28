import React, { useState } from "react";
import logo from "./logo.svg";
import { useQuery } from "react-query";
import "./Home.css";

function Home() {
  const [count, setCount] = useState(0);

  const { isLoading, isError, data } = useQuery(["someQuery"], async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "this data loaded asynchronously";
  });

  let loadedData;
  if (isLoading) {
    loadedData = <p>loading...</p>;
  } else if (isError) {
    loadedData = <p>Error!</p>;
  } else {
    loadedData = <p>{data}</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        {loadedData}
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
}

export default Home;
