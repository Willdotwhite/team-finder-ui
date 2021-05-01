import React, { HTMLAttributes } from "react";
import {ReactSVG} from "react-svg";
import { Role } from "../utils/Roles";

type RVProps = {r: Role, showText?: boolean } & HTMLAttributes<{}>;

export const RoleView: React.FC<RVProps> = ({r, showText = false, className = "", ...props}) => (
  <div className={"text-center leading-tight align-top "+className} {...props}>
    <ReactSVG className={showText ? "mb-2 p-2 border-2 rounded" : ""} src={`/Role Icons/${r.id}.svg`} />
    {showText ? r.name : null}
  </div>
);