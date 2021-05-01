import React from "react";
import { useQuery } from "react-query";
import { TeamData, Team } from "../../components/Team"

export const Home: React.FC = () => {
	
  const { isLoading, isError, data, refetch } = useQuery(["Teams"], async (): Promise<Array<TeamData>> => {
    var arr: Array<Record<string, unknown>> = await fetch("http://178.62.53.195/teams", {mode:"cors"}).then(res => res.json());
    return arr.map(t => new TeamData(t));
  });

  return (
    <div className="container mx-auto my-6 p-2">
      <h1 className="text-3xl text-primary font-light my-6">
        Find a team!
      </h1>

      <button
        className="bg-primary-dark my-6 p-2 focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-primary"
        onClick={() => refetch()}
      >
        Refetch Teams
      </button>

      <div>{
        isLoading ? "Loading.." : isError ? "fuck" : data!.map(t => <Team key={t.id} team={t}/>)
      }</div>
    </div>
  );
};
