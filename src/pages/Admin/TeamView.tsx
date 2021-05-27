import React from "react";
import {Team, TeamData} from "../../components/Team";

export const TeamView: React.FC<{team:TeamData}> = ({team}) => {
  const buttonStyling = "bg-red-500 w-full py-4 mb-6 rounded color-red"

  return (
    <div>
      <div className="inline-block" style={{width: "75%", "vertical-align": "top"}}>
        <Team key={team.id} team={team} />
      </div>
      <div className="inline-block pl-3" style={{width: "25%", "vertical-align": "top"}}>
        <button className={buttonStyling}>Delete Team</button> <br />
        <button className={buttonStyling}>Ban User</button>
      </div>
    </div>
  )
}
