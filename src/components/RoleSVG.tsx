import React, { HTMLAttributes } from "react";
import {ReactSVG} from "react-svg";

type RVProps = {roleId: number} & HTMLAttributes<{}>;
export const RoleSVG: React.FC<RVProps> = ({roleId, ...props}) => (<ReactSVG {...props} src={`/Role Icons/${roleId}.svg`} />);