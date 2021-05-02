import React, { useState } from "react";
import { useQuery } from "react-query";
import { TeamData, Team } from "../../components/Team"
import { RoleSVG } from "../../components/RoleSVG"
import { roles } from "../../utils/Roles";


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
      var color = selected.includes(r.id) ? "fill-primaryBright" : "fill-dimwhite hover:fill-white";
      return (<div data-role={r.id} key={r.id} onClick={() => toggleSelected(r.id)} className={"text-center leading-tight align-top cursor-pointer w-21"}>
        <RoleSVG roleId={r.id} className={"mb-2 p-2 border-2 rounded transition "+color}/>
        {r.name}
      </div>)
    })
  }</div>
}


const TeamList: React.FC<{selectedRoles: number[]}> = ({selectedRoles}) => {
  const url = new URL("http://178.62.53.195/teams");
  // const url = new URL("http://127.0.0.1:8080/teams");

  if (selectedRoles.length) {
    const skillsetMask = selectedRoles.reduce((a, b) => a + b, 0);
    url.searchParams.append("skillsetMask", skillsetMask.toString());
  }

  const { isLoading, isError, data, refetch } = useQuery(["Teams"], async (): Promise<Array<TeamData>> => {
    var arr: Array<Record<string, unknown>> = await fetch(url.toString(), {mode:"cors"}).then(res => res.json());
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
  var roleState = useState<number[]>([]);

  return (
    <div className="container mx-auto px-2 max-w-screen-md">
      <h1 className="text-3xl text-primary font-light my-6">
        Find a team!
      </h1>
      <RoleFilter roleState={roleState}/>
      <TeamList selectedRoles={roleState[0]} />
    </div>
  );
};
