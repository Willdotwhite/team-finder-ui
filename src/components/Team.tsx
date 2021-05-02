import React from "react";
import { getRoles, Role } from "../utils/Roles";
import {RoleSVG} from "./RoleSVG";

export class TeamData {
  author: string;
  description: string;
  skills: Array<Role>;
  createdAt: Date;
  id: number;
  constructor(teamJSON: Record<string, unknown>){
    this.author = teamJSON.author as string;
    // the DB does spit out descriptions now, but they're kinda short
    // this.description = teamJSON.description as string;
    this.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim"
    // currently broken :/
    // this.createdAt = new Date(teamJSON.createdAt as string);
    this.createdAt = new Date();
    // currently using a random role instead of the one from the DB, to introduce some variation
    // this.skills = getRoles(teamJSON.skillsetMask as number);
    this.skills = getRoles(1 + (Math.random() * 1023));
    this.id = teamJSON.id as number;
  }
}

export const Team: React.FC<{team:TeamData}> = ({team}) => {
  // 3600000ms in an hour
  var h = (Date.now() - team.createdAt.valueOf()) / 3600000;
  var timestr = h.toFixed(1) + " Hours ago"

  var skillstr = team.skills.map(r => <RoleSVG roleId={r.id} key={r.id} className="w-7 fill-primaryBright inline-block m-1 align-top"/>);

  return (
    <div className="my-10 p-5 border relative">
      <div className="absolute -top-2.5 left-1 px-3 bg-black leading-none font-bold text-lg">{team.author}</div>
      <div className="flex justify-between">
        <div className="mr-5 text-lg">{team.description}</div>
        <div>
          <div className="mb-1">🕓 {timestr}</div>
          <div className="text-lg w-36">👀 {skillstr}</div>
        </div>
      </div>
    </div>
  )
}