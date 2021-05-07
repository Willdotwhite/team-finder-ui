import React, { useState } from "react";
import { useQuery } from "react-query";
import { PageContainer } from "../../components/PageContainer";
import { PageHeader } from "../../components/PageHeader";
import { TeamData, Team } from "../../components/Team";
import { SkillsetSelector } from "../../components/SkillsetSelector";

const TeamList: React.FC<{ selectedRoles: number[] }> = ({ selectedRoles }) => {
  const url = new URL(`${import.meta.env.VITE_API_URL}/teams`);
  const skillsetMask = selectedRoles.length
    ? selectedRoles.reduce((a, b) => a + b, 0)
    : null;

  if (skillsetMask) {
    url.searchParams.append("skillsetMask", skillsetMask.toString());
  }

  const { isLoading, isError, data, refetch } = useQuery(
    ["Teams", skillsetMask],
    async (): Promise<Array<TeamData>> => {
      const arr: Array<Record<string, unknown>> = await fetch(url.toString(), {
        mode: "cors",
      }).then((res) => res.json());
      return arr.map((t) => new TeamData(t));
    },
    {
      keepPreviousData: true,
    }
  );

  return (
    <div>
      <button
        onClick={() => refetch()}
        className="block bg-primary-dark my-6 p-2 focus:outline-none"
      >
        Refetch Teams
      </button>

      <div>
        {!data && isLoading
          ? "Loading.."
          : isError
          ? "fuck"
          : data!.map((t) => <Team key={t.id} team={t} />)}
      </div>
    </div>
  );
};

export const Home: React.FC = () => {
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

  return (
    <PageContainer>
      <PageHeader>Find a team!</PageHeader>
      <SkillsetSelector
        selectedSkillsets={selectedRoles}
        onChange={setSelectedRoles}
      />
      <TeamList selectedRoles={selectedRoles} />
    </PageContainer>
  );
};
