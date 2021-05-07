import * as React from "react";
import classnames from "classnames";
import { roles as allRoles } from "../utils/Roles";
import { RoleSVG } from "./RoleSVG";

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
  const toggleSelected = (roleId: number) => {
    if (selectedSkillsets.includes(roleId))
      onChange(selectedSkillsets.filter((id) => id != roleId));
    else onChange([...selectedSkillsets, roleId]);
  };

  return (
    <div
      className={classnames(
        "flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 min-w-max",
        className
      )}
    >
      {allRoles.map((r) => {
        const color = selectedSkillsets.includes(r.id)
          ? "fill-primary transition-none"
          : "fill-white opacity-50 group-hover:opacity-100 transition";

        return (
          <div
            data-role={r.id}
            key={r.id}
            onClick={() => toggleSelected(r.id)}
            className={
              "group items-center flex flex-row sm:block sm:text-center leading-tight sm:break-words align-top cursor-pointer sm:flex-1 sm:w-0"
            }
          >
            <RoleSVG
              roleId={r.id}
              className={classnames(
                "mr-2 sm:mr-0 sm:mb-2 p-2 border-2 rounded w-12 sm:w-auto",
                color
              )}
            />
            <span>{r.name}</span>
          </div>
        );
      })}
    </div>
  );
};
