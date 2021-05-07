import * as React from "react";
import { roles as allRoles } from "../utils/Roles";
import { RoleSVG } from "./RoleSVG";

interface Props {
  selectedSkillsets: number[];
  onChange: (newValue: number[]) => void;
}
export const SkillsetSelector: React.FC<Props> = ({
  selectedSkillsets,
  onChange,
}) => {
  const toggleSelected = (roleId: number) => {
    if (selectedSkillsets.includes(roleId))
      onChange(selectedSkillsets.filter((id) => id != roleId));
    else onChange([...selectedSkillsets, roleId]);
  };

  return (
    <div className="flex justify-between my-10">
      {allRoles.map((r) => {
        const color = selectedSkillsets.includes(r.id)
          ? "fill-primary"
          : "fill-white opacity-50 hover:opacity-100";

        return (
          <div
            data-role={r.id}
            key={r.id}
            onClick={() => toggleSelected(r.id)}
            className={
              "text-center leading-tight align-top cursor-pointer w-21"
            }
          >
            <RoleSVG
              roleId={r.id}
              className={"mb-2 p-2 border-2 rounded transition " + color}
            />
            {r.name}
          </div>
        );
      })}
    </div>
  );
};
