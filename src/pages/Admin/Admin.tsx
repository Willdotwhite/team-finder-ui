import React, {useEffect, useState} from "react";
import {getReportedTeams} from "../../utils/TeamActions";
import {Team, TeamData} from "../../components/Team";
import {TeamView} from "./TeamView";

export const Admin: React.FC = () => {
  /** The UI doesn't have a definitive way to know this, but all of these calls are auth-protected for admin users */
  /** If the initial GET /teams/reports fails, we can be fairly safe the user isn't an admin or the login has expired */
  const [notLoggedInAsAdmin, setNotLoggedInAsAdmin] = useState(false);

  const [didMount, setDidMount] = useState(false);

  const [teams, setTeams] = useState([]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => {
    let mounted = true;

    getReportedTeams()
      .then(async (res) => {

        // Set teams if the component has completed mounting (I think)
        if (mounted) {
          setTeams(await res.json())
        }
      })
      .catch(() => setNotLoggedInAsAdmin(true));

    return () => mounted = false;
  }, [])

  if (notLoggedInAsAdmin) {
    return (<p>The API has rejected your access to restricted content. Reauthenticate and try again.</p>)
  }

  console.log("TEAMS", teams)

  return (
    <div>
      {
        teams && teams.length > 0
          // @ts-ignore
          ? teams.map(t => <TeamView key={t.id} team={new TeamData(t)} />)
          : <p>Could not load any reported teams</p>
      }
    </div>
  )
}
