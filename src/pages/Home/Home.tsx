import React, { useState } from "react";
import { useQuery } from "react-query";
import { PageContainer } from "../../components/PageContainer";
import { PageHeader } from "../../components/PageHeader";
import { PageUserInfo } from "../../components/PageUserInfo";
import { PageNavigator } from "../../components/PageNavigator";
import { TeamData, Team } from "../../components/Team"
import { RoleSVG } from "../../components/RoleSVG"
import { roles } from "../../utils/Roles";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";



type RFProps = {
  roleState: [number[], React.Dispatch<React.SetStateAction<number[]>>]
}
const RoleFilter: React.FC<RFProps> = ({roleState:[selected, setSelected]}) => {

  const toggleSelected = (roleId: number) => {
    if(selected.includes(roleId)) setSelected( selected.filter(id => id != roleId) );
    else setSelected( [...selected, roleId] );
  }

  return <div className="flex justify-between my-10">{
    roles.map(r => {
      const color = selected.includes(r.id) ? "fill-white border-primary" : "fill-white opacity-50 hover:opacity-100";

      return (<div data-role={r.id} key={r.id} onClick={() => toggleSelected(r.id)} className={"text-center leading-tight align-top cursor-pointer w-21"}>
        <RoleSVG roleId={r.id} className={"mb-2 p-2 border-2 rounded transition "+color}/>
        {r.name}
      </div>)
    })
  }</div>
}


const TeamList: React.FC<{selectedRoles: number[]}> = ({selectedRoles}) => {
  const url = new URL(`${import.meta.env.VITE_API_URL}/teams`);

  if (selectedRoles.length) {
    const skillsetMask = selectedRoles.reduce((a, b) => a + b, 0);
    url.searchParams.append("skillsetMask", skillsetMask.toString());
  }

  const { isLoading, isError, data, refetch } = useQuery(["Teams"], async (): Promise<Array<TeamData>> => {
    const arr: Array<Record<string, unknown>> = await fetch(url.toString(), {mode:"cors"}).then(res => res.json());
    return arr.map(t => new TeamData(t));
  });

  return (<div>
    <button onClick={() => refetch()} className="block bg-primary-dark my-6 p-2 focus:outline-none">
      Refetch Teams
    </button>
    
    <div>{
      isLoading ? "Loading.." : isError ? "fuck" :
      data!.map(t => <Team key={t.id} team={t}/>)
    }</div>
  </div>)
}


export const Home: React.FC = () => {
  const roleState = useState<number[]>([]);

  return (
    <PageContainer>
      <NavLink to="/"> <img className="my-2" src={"MainLogo.png"}></img></NavLink>
      <PageUserInfo/>
      <PageNavigator/>
      <PageHeader>
        Find a team!
      </PageHeader>
      <RoleFilter roleState={roleState}/>
      <TeamList selectedRoles={roleState[0]} />
    </PageContainer>
  );
};
