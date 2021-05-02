import * as React from "react";
import { ReactSVG, Props as ReactSVGProps } from "react-svg";

interface RVProps extends Omit<ReactSVGProps, "ref"> {
  roleId: number;
}
export const RoleSVG: React.FC<RVProps> = ({ roleId, ...props }) => (
  <ReactSVG {...props} src={`/Role Icons/${roleId}.svg`} />
);
