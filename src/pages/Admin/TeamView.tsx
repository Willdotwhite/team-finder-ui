import React from "react";
import {Team, TeamData} from "../../components/Team";
import {adminBanUser, adminClearReports, adminDeleteTeam} from "../../utils/TeamActions";
import {AddMessage} from "../../components/StatusMessenger";

const tryDeleteTeam = (teamId: string) => tryPerformAction(() => adminDeleteTeam(teamId))

const tryBanUser = (userId: string) => tryPerformAction(() => adminBanUser(userId))

const tryClearReports = (teamId: string) => tryPerformAction(() => adminClearReports(teamId))

const tryPerformAction = async (callableFunction: any) => {
  try {
    const res = await callableFunction();

    if (res.status != 200) {
      AddMessage("bg-red-500", "There was an error trying to perform this action. Please try again.");
      return;
    }

    AddMessage("bg-primary-dark", "Action successful. Refresh page to update list.");
  } catch (e) {
    AddMessage("bg-red-500", "Something went wrong - check JS Console for more details.");
    console.log(e)
  }
}

export const TeamView: React.FC<{team:TeamData}> = ({team}) => {
  const buttonStyling = "w-full py-2 mb-3 rounded"

  return (
    <div>
      <div className="inline-block" style={{width: "75%", verticalAlign: "top"}}>
        <Team key={team.id} team={team} />
      </div>
      <div className="inline-block pl-3" style={{width: "25%", verticalAlign: "top"}}>
        <p className="mb-2">Report count: {team.reportCount}</p>
        <button onClick={() => tryDeleteTeam(team.id.toString())} className={buttonStyling + " bg-red-500"}>Delete Team</button> <br />
        <button onClick={() => tryBanUser(team.authorId)} className={buttonStyling + " bg-red-500"}>Ban User</button>
        <button onClick={() => tryClearReports(team.id.toString())} className={buttonStyling + " bg-green-500"}>Clear Reports</button>
      </div>
    </div>
  )
}
