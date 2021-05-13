import * as React from "react";
import { NavLink } from "react-router-dom";
import { UserInfo } from "./UserInfo";


let userIsLoggedIn = false;
let userInfo: UserInfo = {avatar: undefined, username: undefined};

// TODO: Handle data not present/malformed
export function CheckSimpleLogin() {
  let storedUserData = localStorage.getItem("userData");
  if (storedUserData != null) {
    userInfo = JSON.parse(storedUserData)
    userIsLoggedIn = true;
  }
  return (userIsLoggedIn);
}

export const PageUserInfo: React.FC = () => (
  <div className="text-center">
    { userIsLoggedIn ? (
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
      <h1 className="text-white text-center mx-6">No Team Registered</h1>
    </div>
  </div>
)

const LoggedOutUserInfoPanel: React.FC = () => (
  <>
    <a href={`${import.meta.env.VITE_API_URL}/oauth2/authorization/discord`} className="inline-block text-white text-3xl mt-8 mb-2 w-auto hover:underline">Log In{"\n"}With Discord</a>
    <div className="text-white">if you want to register a Team</div>
  </>
)
