import React, { useState } from "react";
import { useQuery } from "react-query";
import { getRoles } from "../../utils/Roles";

interface Team {
  author: string,
  createdAt: string,
  name: string,
  skillsetMask: number,
  id: number
}

const Teams: React.FC = () => {
  const { isLoading, isError, data } = useQuery(["someQuery"], async (): Promise<Array<Team>> => {
    return fetch("http://178.62.53.195/teams", {mode:"cors"}).then(res => res.json());
  });

  return <div>{
    isLoading ? "Loading.." : isError ? "fuck" : data!.map(t => <div key={t.id} className="p-3">
        <div>{t.name}</div>
        <div>{t.author}</div>
        <div>{t.createdAt}</div>

        {/*<div>{getRoles(t.skillsetMask)}</div>*/}
        {<div>{JSON.stringify(getRoles(1 + (Math.random() * 1023)))}</div>}
        <div>{t.id}</div>
      </div>)
  }</div>
}

export const Home: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="container mx-auto my-6">
      <h1 className="text-3xl text-primary font-light px-6 pb-6">
        Hello World
      </h1>
      <div className="border border-white p-6 space-y-3 border-opacity-25">
        <button
          className="bg-primary-dark p-2 focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-primary"
          onClick={() => setCount((count) => count + 1)}
        >
          count is: {count}
        </button>
        <Teams/>
      </div>
    </div>
  );
};
