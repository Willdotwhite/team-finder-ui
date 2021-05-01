import React, { useState } from "react";
import { useQuery } from "react-query";
import { TeamData, Team } from "../../components/Team"
import { RoleView } from "../../components/RoleView"
import { roles } from "../../utils/Roles";


type RFProps = {
  roleState: [number[], React.Dispatch<React.SetStateAction<number[]>>]
}
const RoleFilter: React.FC<RFProps> = ({roleState:[selected, setSelected]}) => {

  const click = (evid: number) => {
    if(selected.includes(evid)) setSelected( selected.filter(id => evid != id) );
    else setSelected( [...selected, evid] );
  }

  var roleClass = "cursor-pointer transition w-20 ";

  return <div className="flex justify-between my-10">{
    roles.map(r => {
      var color = selected.includes(r.id) ? "fill-bright" : "fill-dimwhite hover:fill-white";
      return <RoleView onClick={() => click(r.id)} showText={true} className={roleClass+color} key={r.id} r={r}/>;
    })
  }</div>
}


const TeamList: React.FC<{selectedRoles: number[]}> = ({selectedRoles}) => {
  // TODO: selectedRoles filter queries
  // not implemented in back-end yet

  const { isLoading, isError, data, refetch } = useQuery(["Teams"], async (): Promise<Array<TeamData>> => {
    var arr: Array<Record<string, unknown>> = await fetch("http://178.62.53.195/teams", {mode:"cors"}).then(res => res.json());
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
