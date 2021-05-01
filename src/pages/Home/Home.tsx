import React from "react";
import { useQuery } from "react-query";
import { PageContainer } from "../../components/PageContainer";
import { PageHeader } from "../../components/PageHeader";
import { TeamData, Team } from "../../components/Team"

export const Home: React.FC = () => {
	
  const { isLoading, isError, data, refetch } = useQuery(["Teams"], async (): Promise<Array<TeamData>> => {
    var arr: Array<Record<string, unknown>> = await fetch("http://178.62.53.195/teams", {mode:"cors"}).then(res => res.json());
    return arr.map(t => new TeamData(t));
  });

  return (
    <PageContainer>
      <PageHeader>
        Find a team!
      </PageHeader>

      <button
        className="bg-primary-dark my-6 p-2 focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-primary"
        onClick={() => refetch()}
      >
        Refetch Teams
      </button>

      <div>{
        isLoading ? "Loading.." : isError ? "fuck" : data!.map(t => <Team key={t.id} team={t}/>)
      }</div>
    </PageContainer>
  );
};
