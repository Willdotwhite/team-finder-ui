import React from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en"

import { getRoles, Role } from "../utils/Roles";
import {RoleSVG} from "./RoleSVG";

// Use English time
TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-GB')

export class TeamData {
  author: string;
  description: string;
  skills: Array<Role>;
  createdAt: Date;
  id: number;
  constructor(teamJSON: Record<string, unknown>){
    this.author = teamJSON.author as string;
    this.description = teamJSON.description as string;
    this.createdAt = new Date(teamJSON.createdAt as string);
    this.skills = getRoles(teamJSON.skillsetMask as number);
    this.id = teamJSON.id as number;
  }
}

export const Team: React.FC<{team:TeamData}> = ({team}) => {
  var skillstr = team.skills.map(r => <RoleSVG roleId={r.id} key={r.id} className="w-7 fill-primary inline-block m-1 align-top"/>);

  return (
    <div data-team-id={team.id} className="my-10 p-5 border relative">
      <div className="absolute -top-2.5 left-1 px-3 bg-black leading-none font-bold text-lg">{team.author}</div>
      <div className="flex justify-between">
        <div className="mr-5 text-lg">{team.description}</div>
        <div>
          <div className="mb-1">🕓 {timeAgo.format(team.createdAt)}</div>
          <div className="text-lg w-36">👀 {skillstr}</div>
        </div>
      </div>
    </div>
  )
}
