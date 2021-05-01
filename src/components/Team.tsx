import React from "react";
import { getRoles, Role } from "../utils/Roles";

export class TeamData {
  author: string;
  description: string;
  skills: Array<Role>;
  createdAt: Date;
  id: number;
  constructor(teamJSON: Record<string, unknown>){
    this.author = teamJSON.author as string;
    // using lorem as the description, awaiting DB change:
    // this.description = teamJSON.description as string;
    this.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim"
    this.createdAt = new Date(teamJSON.createdAt as string);
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

  var skillstr = team.skills.map(r => r.name).toString().replaceAll(',', ', ');

  return (
    <div className="py-3">
      <div>{team.author}</div>
      <div>{team.description}</div>
      <div>{timestr}</div>
      <div>{skillstr}</div>
    </div>
  )
}