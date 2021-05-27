import React from "react";
import { formatDistanceToNow } from 'date-fns';
import { enGB } from 'date-fns/locale';

import { getSkillsets, Skillset } from "../utils/Skillsets";
import { getDisplay } from "../utils/LanguageData";
import { SkillsetSVG } from "./SkillsetSVG";
import { ReportButton } from "./ReportButton";

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

  const skillIcons = team.skills.map(r => <SkillsetSVG skillsetId={r.id} key={r.id} className="w-6 fill-primary inline-block m-1 align-top"/>);
  const author = team.author.replace(/#\d{4}$/, "");

  return (
    <div data-team-id={team.id} className="mb-24 p-6 pb-20 border relative">

      {/* Headings that cut into the top border */}
      <div className="absolute -top-2.5 left-2 px-3 bg-black leading-none font-bold text-lg">
        {author}&rsquo;s Team
      </div>

      <div className="absolute -top-2.5 right-10 px-3 bg-black leading-none font-bold text-lg">
        Skills needed:
      </div>

      {/* flexbox for displaying description + skills */}
      <div className="flex">
        <div className="flex-grow mr-5 overflow-hidden">
          {team.description}
        </div>

        <div className="flex-shrink-0 w-36">
          {skillIcons}
        </div>
      </div>

      {/* absolutely positioned container for meta info */}
      <div className="absolute bottom-6 left-5 text-xs overflow-hidden">
        <span>
          🕓&nbsp;
          {formatDistanceToNow(team.updatedAt, {
            addSuffix: true,
            locale: enGB,
          })}
        </span>

        <span className="mx-10">
          Languages: {getDisplay(team.languages)}
        </span>
        
        <ReportButton
          teamId={team.id.toString()}
        />
      </div>

      {/* Message CTA */}
      <a
        target="_blank" rel="noreferrer"
        href={`https://discordapp.com/users/${team.authorId}`}
        className="text-sm p-2 leading-none absolute bottom-5 right-5 rounded"
        style={{background:"#5865F2"}}
      >
        Message {author} on Discord
      </a>
    </div>
  )
}
