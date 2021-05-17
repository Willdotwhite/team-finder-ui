import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { PageHeader } from "../../components/PageHeader";
import { TeamData, Team } from "../../components/Team";
import { SkillsetSelector } from "../../components/SkillsetSelector";
import { ReactSVG } from "react-svg";

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
      Filter by what skills you can offer:
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
    isLoading: initalLoad,
    isFetchingNextPage, isError, data, fetchNextPage
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

    const docEle = document.documentElement;

    const onScroll = () => {
      const distanceLeft = docEle.scrollHeight - (docEle.scrollTop + innerHeight);
      if(distanceLeft < 200) fetchNextPage();
    }

    const listenTo = [window, docEle];

    listenTo.forEach(x =>
      x.addEventListener("scroll", onScroll, {passive: true})
    );

    return () => listenTo.forEach(x =>
      x.removeEventListener("scroll", onScroll)
    );
  }, [fetchNextPage, allLoaded]);

  return (
    <div>
      <label className="text-lg">
        Sort By:
        <select
          value={order}
          onChange={e => updateOrder(e.target.value as orderVals)}
          className="text-black block p-1 pb-1.5 mt-1 outline-none"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
          <option value="random">Random</option>
        </select>
      </label>

      <div>{isError ?
        "Sorry, something went wrong. Please try again in a few minutes." :
        pagesArray.map(arr =>
          arr.map((t) => <Team key={t.id} team={t} />)
        )
      }</div>
      
      {isLoading ?
        <ReactSVG className="w-40 m-auto block" src="/spinner.svg"/>
      : null}

      {allLoaded ?
        <div className="text-center text-2xl pb-10">No more teams to load</div>
      : null}
    </div>
  );
};