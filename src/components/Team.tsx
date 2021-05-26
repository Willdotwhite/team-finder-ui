import React from "react";
import { formatDistanceToNow } from 'date-fns';
import { enGB } from 'date-fns/locale';

import { getSkillsets, Skillset } from "../utils/Skillsets";
import {SkillsetSVG} from "./SkillsetSVG";
import { getFlags } from "./LanguageSelector";

export class TeamData {
  author: string;
  authorId: string;
  description: string;
  languages: string[];
  skills: Array<Skillset>;
  updatedAt: Date;
  id: number;
  constructor(teamJSON: Record<string, unknown>){
    this.author = teamJSON.author as string;
    this.authorId = teamJSON.authorId as string;
    this.description = teamJSON.description as string;
    this.languages = (teamJSON.languages as string).split(",");

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

  const skillstr = team.skills.map(r => <SkillsetSVG skillsetId={r.id} key={r.id} className="w-6 fill-primary inline-block m-1 align-top"/>);

  return (
    <div data-team-id={team.id} className="my-12 p-5 pb-3 border relative">
      <div className="absolute -top-3.5 left-1 px-3 bg-black leading-none font-bold text-lg">
        <a href={`https://discordapp.com/users/${team.authorId}`} target="_blank" rel="noreferrer">
          <span className="pb-1 border-b-2 border-white" style={{borderBottomWidth: "1px"}}>
            {team.author}&rsquo;s Team
            <img
              className="inline-block m-0 w-6 pl-1 fill-primary"
              src="/Speechbubble.svg"
              width={21}
              height={24}
              alt="Click here to open this user's Discord profile"
            />
          </span>
        </a>
      </div>

      <div className="absolute -top-2.5 right-10 px-3 bg-black leading-none font-bold text-lg">
        Skills needed:
      </div>

      <div className="flex justify-between">
        <div className="mr-5 overflow-hidden">
          {team.description}

          {/* Horrific spacing hack to ensure the position:absolute row below doesn't overlap variable-length text */}
          <br />&nbsp;<br />&nbsp;

          <div className="absolute bottom-4 block">
            <span className="text-xs mr-2">
               {getFlags(team.languages)}
            </span>
            <span className="text-xs">
              🕓 &nbsp;&nbsp;
              {formatDistanceToNow(team.updatedAt, {
                addSuffix: true,
                locale: enGB,
              })}
            </span>
          </div>
        </div>

        <div> {/* Empty div used in flex spacing, somehow */}
          <div className="text-lg w-36">{skillstr}</div>
        </div>
      </div>
    </div>
  )
}
