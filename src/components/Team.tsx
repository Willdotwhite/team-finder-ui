import React from "react";
import { formatDistanceToNow } from 'date-fns';
import { enGB } from 'date-fns/locale';

import { getSkillsets, Skillset } from "../utils/Skillsets";
import { getDisplay } from "../utils/LanguageData";
import { limitNewlines } from "../utils/limitNewlines";
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
  reportCount: number;
  constructor(teamJSON: Record<string, unknown>){
    this.author = teamJSON.author as string;
    this.authorId = teamJSON.authorId as string;
    this.description = teamJSON.description as string;
    this.languages = (teamJSON.languages as string).split(",");
    this.reportCount = teamJSON.reportCount as number;

    const updatedAt = teamJSON.updatedAt as string;
    // to make sure browsers assume UTC, weird string additions
    this.updatedAt = new Date(updatedAt.replace(" ", "T")+"Z");

    this.skills = getSkillsets(teamJSON.skillsetMask as number);
    this.id = teamJSON.id as number;
  }
}

export const Team: React.FC<{team:TeamData}> = ({team}) => {

  const skillIcons = team.skills.map((r) => (
    <SkillsetSVG
      skillsetId={r.id}
      key={r.id}
      title={r.name}
      aria-label={r.name}
      className="w-6 fill-primary inline-block m-1 align-top"
    />
  ));
  
  const author = team.author.replace(/#\d{4}$/, "");

  return (
    <div data-team-id={team.id} className="mb-24 p-6 border relative">

      {/* Headings that cut into the top border */}
      <div className="absolute -top-2.5 left-2 px-3 bg-black leading-none font-bold text-lg">
        {author}&rsquo;s Team
      </div>

      <div className="absolute -top-2.5 right-10 px-3 bg-black leading-none font-bold text-lg">
        Skills needed:
      </div>

      {/* flexbox for displaying description + skills */}
      <div className="flex">
        <div className="flex-grow mr-5 overflow-hidden whitespace-pre-wrap">
          {limitNewlines(team.description)}
        </div>

        <div className="flex-shrink-0 w-36">
          {skillIcons}
        </div>
      </div>

      {/* absolutely positioned container for meta info + Message CTA */}
      <div className="text-xs mt-3 w-full overflow-hidden flex justify-between flex-wrap space-x-4">

        <span className="flex-shrink-0 pt-2">
          🕓&nbsp;&nbsp;
          {formatDistanceToNow(team.updatedAt, {
            addSuffix: true,
            locale: enGB,
          })}
        </span>

        <span className="flex-shrink-0 pt-2">
          Languages: {getDisplay(team.languages)}
        </span>
        
        <ReportButton
          className="flex-shrink-0 mb-2"
          teamId={team.id.toString()}
        />

        <a
          target="_blank" rel="noreferrer"
          href={`https://discordapp.com/users/${team.authorId}`}
          className="text-sm p-2 leading-none rounded text-trueWhite self-end flex-shrink-0"
          style={{background:"#5865F2"}}
        >
          Message {author} on Discord
        </a>

      </div>
    </div>
  )
}
