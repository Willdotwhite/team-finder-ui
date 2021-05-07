import * as React from "react";
import classnames from "classnames";
import { skillsets as allSkillsets } from "../utils/Skillsets";
import { SkillsetSVG } from "./SkillsetSVG";

interface Props {
  selectedSkillsets: number[];
  onChange: (newValue: number[]) => void;
  className?: string;
}
export const SkillsetSelector: React.FC<Props> = ({
  selectedSkillsets,
  onChange,
  className,
}) => {
  const toggleSelected = (skillId: number) => {
    if (selectedSkillsets.includes(skillId))
      onChange(selectedSkillsets.filter((id) => id != skillId));
    else onChange([...selectedSkillsets, skillId]);
  };

  return (
    <div
      className={classnames(
        "flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 min-w-max",
        className
      )}
    >
      {allSkillsets.map((s) => {
        const color = selectedSkillsets.includes(s.id)
          ? "fill-primary transition-none"
          : "fill-white opacity-50 group-hover:opacity-100 transition";

        return (
          <div
            data-skill={s.id}
            key={s.id}
            onClick={() => toggleSelected(s.id)}
            className={
              "group items-center flex flex-row sm:block sm:text-center leading-tight sm:break-words align-top cursor-pointer sm:flex-1 sm:w-0"
            }
          >
            <SkillsetSVG
              skillsetId={s.id}
              className={classnames(
                "mr-2 sm:mr-0 sm:mb-2 p-2 border-2 rounded w-12 sm:w-auto",
                color
              )}
            />
            <span>{s.name}</span>
          </div>
        );
      })}
    </div>
  );
};
