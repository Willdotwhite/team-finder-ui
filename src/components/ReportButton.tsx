import * as React from "react";
import {Props} from "react";
import {reportTeam} from "../utils/TeamActions";

const trySubmitReport = (teamId: string) => {
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
  })
}


// @ts-ignore
export const ReportButton: React.FC<Props<any>> = ({teamId: teamId}) => {
  return (
    <img
      className="cursor-pointer mr-1 w-6 pl-1"
      onClick={() => trySubmitReport(teamId)}
      src="/Flag.svg"
      width={21}
      height={24}
      alt="Report Team"
    />
  )
};
