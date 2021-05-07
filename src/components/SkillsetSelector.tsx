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
    <div className={classnames("flex space-x-2", className)}>
      {allRoles.map((r) => {
        const color = selectedSkillsets.includes(r.id)
          ? "fill-primary transition-none"
          : "fill-white opacity-50 hover:opacity-100 transition";

        return (
          <div
            data-role={r.id}
            key={r.id}
            onClick={() => toggleSelected(r.id)}
            className={
              "text-center leading-tight break-words align-top cursor-pointer flex-1 w-0"
            }
          >
            <RoleSVG
              roleId={r.id}
              className={classnames("mb-2 p-2 border-2 rounded", color)}
            />
            <span>{r.name}</span>
          </div>
        );
      })}
    </div>
  );
};
