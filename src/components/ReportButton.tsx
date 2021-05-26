import * as React from "react";
import {Props} from "react";
import {reportTeam} from "../utils/TeamActions";
import { isUserLoggedIn } from "../components/PageUserInfo";
import { AddMessage } from "../components/StatusMessenger";

const trySubmitReport = (teamId: string) => {
  if (!isUserLoggedIn()) {
    AddMessage("bg-red-500", "Please login to report a team");
    return;
  }

  if (hasAlreadySubmittedTeam(teamId)) {
    return;
  }

  submitReport(teamId);
}

const hasAlreadySubmittedTeam = (teamId: string) => getReports()[teamId] === true;

const getReports = () => JSON.parse(localStorage.getItem("reports") || '{}');

const submitReport = (teamId: string) => {
  reportTeam(teamId).then(() => {
    const reports = getReports();
    reports[teamId] = true;
    localStorage.setItem("reports", JSON.stringify(reports));

    AddMessage("bg-green-500", "Your report has been received, a moderator will look into this further");
  })
}

const activeStyle = "invert(1) sepia(1) saturate(5) hue-rotate(330deg)"

// @ts-ignore
export const ReportButton: React.FC<Props<any>> = ({teamId: teamId}) => {
  return (
    <div
      className="cursor-pointer mr-1 w-6 pl-1"
      onClick={() => trySubmitReport(teamId)}
    >
      <object
        type="image/svg+xml"
        data="./Flag.svg"
        width="21"
        height="24"
        style={{filter: hasAlreadySubmittedTeam(teamId) ? activeStyle : ""}}
      >
        {/* This space for rent */}
      </object>
    </div>
  )
};
