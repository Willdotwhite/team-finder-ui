import React, { useState } from "react";
import { useQuery } from "react-query";
import { PageHeader } from "../../components/PageHeader";
import { TeamData, Team } from "../../components/Team";
import { SkillsetSelector } from "../../components/SkillsetSelector";
import { getAllTeams } from "../../utils/TeamActions";

interface TLprops { selectedSkillsets: number[] };
const TeamList: React.FC<TLprops> = ({selectedSkillsets}) => {
  const skillsetMask = selectedSkillsets.length
    ? selectedSkillsets.reduce((a, b) => a + b, 0)
    : null;

  const { isLoading, isError, data, refetch } = useQuery(["Teams", skillsetMask],
    async (): Promise<Array<TeamData>> => {
      return ( await getAllTeams({skillsetMask}) ).map((t) => new TeamData(t));
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
  const [selectedSkillsets, setSelectedSkillsets] = useState<number[]>([]);

  return (<>
    <PageHeader>
      Find teams looking for:
    </PageHeader>
    <SkillsetSelector
      selectedSkillsets={selectedSkillsets}
      onChange={setSelectedSkillsets}
    />
    <TeamList selectedSkillsets={selectedSkillsets} />
  </>);
};
