import React, { useState } from "react";
import { useQuery } from "react-query";
import { PageContainer } from "../../components/PageContainer";
import { PageHeader } from "../../components/PageHeader";
import { PageUserInfo } from "../../components/PageUserInfo";
import { PageNavigator } from "../../components/PageNavigator";
import { TeamData, Team } from "../../components/Team";
import { SkillsetSelector } from "../../components/SkillsetSelector";
import { NavLink } from "react-router-dom";
import { SkillsetSVG } from "../../components/SkillsetSVG"
import { skillsets } from "../../utils/Skillsets"

type RFProps = {
  roleState: [number[], React.Dispatch<React.SetStateAction<number[]>>]
}
const RoleFilter: React.FC<RFProps> = ({roleState:[selected, setSelected]}) => {

  const toggleSelected = (roleId: number) => {
    if(selected.includes(roleId)) setSelected( selected.filter(id => id != roleId) );
    else setSelected( [...selected, roleId] );
  }

  return <div className="flex justify-between">{
    skillsets.map(r => {
      const color = selected.includes(r.id) ? "fill-white border-primary" : "fill-white opacity-50 hover:opacity-100";

      return (<div data-role={r.id} key={r.id} onClick={() => toggleSelected(r.id)} className={"text-center leading-tight align-top cursor-pointer w-21"}>
        <SkillsetSVG skillsetId={r.id} className={"mb-2 p-2 border-2 rounded transition "+color} />
        {r.name}
      </div>)
    })
  }</div>
}

const TeamList: React.FC<{ selectedSkillsets: number[] }> = ({
  selectedSkillsets,
}) => {
  const url = new URL(`${import.meta.env.VITE_API_URL}/teams`);
  const skillsetMask = selectedSkillsets.length
    ? selectedSkillsets.reduce((a, b) => a + b, 0)
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
  const [selectedSkillsets, setSelectedSkillsets] = useState<number[]>([]);

  return (
    <PageContainer>
      <NavLink to="/">
        <div className="text-center">
          {/* TODO: Resize and optimise this image before launch */}
          <img className="inline-block my-2" src="MainLogo.png" alt="GMTK Game Jam 2021 - Team Finder" style={{height: "100px"}} />
        </div>
      </NavLink>
      <PageUserInfo/>
      <PageNavigator/>
      <SkillsetSelector
        selectedSkillsets={selectedSkillsets}
        onChange={setSelectedSkillsets}
      />
      <TeamList selectedSkillsets={selectedSkillsets} />
    </PageContainer>
  );
};
