import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { PageHeader } from "../../components/PageHeader";
import { TeamData, Team } from "../../components/Team";
import { SkillsetSelector } from "../../components/SkillsetSelector";

const getTeamsList = (
  queryParams: {
    order: "asc" | "desc" | "random";
    skillsetMask: number;
    page: number;
  }
): Promise<Array<Record<string, unknown>>> => {
  const url = new URL(`${import.meta.env.VITE_API_URL}/teams`);

  for(const [k, v] of Object.entries(queryParams)) url.searchParams.append(k, v.toString());

  return fetch(url.toString(), { mode: "cors" }).then((res) => res.json());
};

const pageSize = 25;

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

  const {
    isFetchingNextPage, isLoading: initalLoad, isError, data, fetchNextPage
  } = useInfiniteQuery(["Teams", skillsetMask, order],
    async ({pageParam: page = 1}) =>
      ( await getTeamsList({ skillsetMask, order, page }) ).map((t) => new TeamData(t)),
    {
      getNextPageParam: (lastPage, allPages) => lastPage.length < pageSize ? undefined : allPages.length
    }
  );
  const pagesArray = data ? data.pages : [] as TeamData[][];
  const isLoading = initalLoad || isFetchingNextPage;

  const lastPage = pagesArray[pagesArray.length - 1] || [];
  const allLoaded = lastPage.length < pageSize;

  useEffect(() => {
    if(allLoaded) return;
    const de = document.documentElement;

    const onScroll = () => {
      const distanceLeft = de.scrollHeight - (de.scrollTop + innerHeight);
      if(distanceLeft < 200) fetchNextPage();
    }

    window.addEventListener("scroll", onScroll, {passive: true});
    de.addEventListener("scroll", onScroll, {passive: true});
    return () => {
      window.removeEventListener("scroll", onScroll);
      de.removeEventListener("scroll", onScroll);
    }
  }, [fetchNextPage, allLoaded]);

  return (
    <div>
      <label className="text-lg">
        Sort By:
        <select className="text-black block p-1 pb-1.5 mt-1 outline-none" value={order} onChange={e => updateOrder(e.target.value as orderVals)}>
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
          <option value="random">Random</option>
        </select>
      </label>

      <div>
        {isError ?
          "Sorry, something went wrong. Please try again in a few minutes." :
          pagesArray.map(arr =>
            arr.map((t) => <Team key={t.id} team={t} />)
          )
        }
        {/* literally just slapped in. please replace it. god. please. */}
        {isLoading ? <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" /> : null}
      </div>

      {allLoaded ?
        <div className="text-center text-2xl pb-10">No more teams to load</div>
      : null}
    </div>
  );
};