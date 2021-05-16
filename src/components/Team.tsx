import React from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en"

import { getSkillsets, Skillset } from "../utils/Skillsets";
import {SkillsetSVG} from "./SkillsetSVG";

// Use English time
TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-GB')

export class TeamData {
  author: string;
  authorId: string;
  description: string;
  skills: Array<Skillset>;
  updatedAt: Date;
  id: number;
  constructor(teamJSON: Record<string, unknown>){
    this.author = teamJSON.author as string;
    this.authorId = teamJSON.authorId as string;
    this.description = teamJSON.description as string;

    const updatedAt = teamJSON.updatedAt as string;
    this.updatedAt = new Date(updatedAt);
    // Safari can't handle YYYY-mm-dd HH:MM:ss, but it _can_ handle YYYY-mm-ddTHH:MM:ss
    if (isNaN(this.updatedAt.getTime())) {
      this.updatedAt = new Date(updatedAt.replace(" ", "T"))
    }

    this.skills = getSkillsets(teamJSON.skillsetMask as number);
    this.id = teamJSON.id as number;
  }
}

export const Team: React.FC<{team:TeamData}> = ({team}) => {

  const skills = team.skills.map(r => <SkillsetSVG skillsetId={r.id} key={r.id} className="w-10 fill-primary inline-block m-1 align-top"/>);

  return (
    <div data-team-id={team.id} className="my-12 p-5 border relative">
      <div className="absolute -top-3.5 left-1 px-3 bg-black leading-none font-bold text-lg">
        <a href={`https://discordapp.com/users/${team.authorId}`} target="_blank" rel="noreferrer">
          <span className="pb-1 border-b-2 border-white" style={{borderBottomWidth: "1px"}}>
            🔗 {team.author}&rsquo;s Team
          </span>
        </a>
      </div>
      <div className="flex justify-between">
        <div className="mr-5 mt-1 text-lg pb-7">
          {team.description}
          <div className="text-sm absolute bottom-3 left-4">🕗 {timeAgo.format(team.updatedAt)}</div>
        </div>
        <div>
          <div className="mb-1">Looking for skills:</div>
          <div className="text-lg w-48">{skills}</div>
        </div>
      </div>
    </div>
  )
}
