import React, { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { PageHeader } from "../../components/PageHeader";
import { TeamData, Team } from "../../components/Team";
import { SkillsetSelector } from "../../components/SkillsetSelector";
import { getTeamsList } from "../../utils/TeamActions";
import { getLastItem } from "../../utils/getLastItem";

export const Home: React.FC = () => {
  const [selectedSkillsets, setSelectedSkillsets] = useState<number[]>([]);

  return (<>
    <PageHeader>
      Filter by what skills you can give:
    </PageHeader>
    <SkillsetSelector
      selectedSkillsets={selectedSkillsets}
      onChange={setSelectedSkillsets}
    />
    <TeamList skillsetMask={ selectedSkillsets.reduce((a, b) => a + b, 0) } />
  </>);
};

type orderVals = "desc" | "asc" | "random";

const TeamList: React.FC<{skillsetMask:number}> = ({skillsetMask}) => {
  const [order, updateOrder] = useState<orderVals>("desc");

  const { isLoading, isError, data, refetch, fetchNextPage } = useInfiniteQuery(["Teams", skillsetMask, order],
    async ({pageParam: page = 1}): Promise<Array<TeamData>> => {
      return ( await getTeamsList( { skillsetMask, order, page } ) ).map((t) => new TeamData(t));
    },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => lastPage.length < 25 ? undefined : allPages.length
    }
  );
  const pagesArray = data ? data.pages : [] as TeamData[][];

  return (
    <div>
      <select className="text-black" value={order} onChange={e => updateOrder(e.target.value as orderVals)}>
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
        <option value="random">Random</option>
      </select>
      <button
        onClick={() => fetchNextPage()}
        className="block bg-primary-dark my-6 p-2 focus:outline-none"
        disabled={isLoading}
      >
        Load Next
      </button>
      <button
        onClick={() => refetch()}
        className="block bg-primary-dark my-6 p-2 focus:outline-none"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Refresh List"}
      </button>

      <div>
        {isError ?
          "Sorry, something went wrong. Please try again in a few minutes." :
          pagesArray.map(arr =>
            arr.map((t) => <Team key={t.id} team={t} />)
          )
         }
        {isLoading ? <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" /> : null}
      </div>
    </div>
  );
};