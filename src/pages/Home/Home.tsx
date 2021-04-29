import React, { useState } from "react";
import { useQuery } from "react-query";

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
    <div className="container mx-auto my-6">
      <h1 className="text-3xl text-primary font-light px-6 pb-6">
        Hello World
      </h1>
      <div className="border border-white p-6 space-y-3 border-opacity-25">
        <p>{loadedData}</p>
        <button
          className="bg-primary-dark p-2 focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-primary"
          onClick={() => setCount((count) => count + 1)}
        >
          count is: {count}
        </button>
      </div>
    </div>
  );
};
