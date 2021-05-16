import * as React from "react";
import { NavLink } from "react-router-dom";
import { UserInfo } from "../utils/UserInfo";
import { getTeam } from "../utils/TeamActions";
import { useQuery } from "react-query";
import { SkillsetSVG } from "./SkillsetSVG";
import { getSkillsets } from "../utils/Skillsets";


let userInfo: UserInfo = {avatar: undefined, username: undefined};
let storedUserData = null;


// TODO: Handle data not present/malformed
export function isUserLoggedIn(): boolean {
  return (localStorage.getItem("userData") != null);
}

export const PageUserTeam: React.FC = () => {

  const {
    data: userTeam,
    isLoading,
    error: errorLoading,
  } = useQuery("userTeam", async () => {
    return getTeam();
  });

  const skillsets = 
    userTeam == null
    ? null
    : getSkillsets(userTeam.skillsetMask);

  const skillstr =
  (skillsets != null && userTeam != null)
  ? skillsets.map(r => <SkillsetSVG skillsetId={r.id} key={r.id} className="align-middle w-7 fill-primary inline-block m-1 align-top"/>)
  : null;

  return(
    <div>
      {skillstr == null
        ? "No team registered."
        : "Skills needed:"}{skillstr}
    </div>
  );

};

export const PageUserInfo: React.FC = () => (
  <div className="text-center">
    { isUserLoggedIn() ? (
        storedUserData = localStorage.getItem("userData"),
        userInfo = JSON.parse(storedUserData || '{}'),
        <LoggedInUserInfoPanel avatar={userInfo.avatar} username={userInfo.username} />
      ) : (
        <LoggedOutUserInfoPanel />
      )
    }
  </div>
);

const LoggedInUserInfoPanel: React.FC<UserInfo> = ({avatar, username}) => (
  <div className="inline-flex flex-row justify-center items-center p-6 border">
    <img style={{height: "90px", width: "90px"}} className="object-cover rounded-full ring-4 ring-primary" src={avatar} />
    <div className="flex flex-col justify-center">
      <div className="flex flex-row mb-2">
        <h1 className="text-white font-bold text-lg text-left mx-6">
          {username}
        </h1>
        <NavLink to="/logout" className="text-white text-right ml-6 hover:underline hover:cursor-pointer">Log Out</NavLink>
      </div>
      <h1 className="text-white text-center mx-6">Team Status:</h1>
      <h1 className="text-white text-center mx-6"><PageUserTeam/></h1>
    </div>
  </div>
)

const LoggedOutUserInfoPanel: React.FC = () => (
  <>
    <a href={`${import.meta.env.VITE_API_URL}/oauth2/authorization/discord`} className="inline-block text-white text-3xl mt-8 mb-2 w-auto hover:underline">Log In{"\n"}With Discord</a>
    <div className="text-white">if you want to register a Team</div>
  </>
)
