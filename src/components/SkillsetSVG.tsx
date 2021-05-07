import * as React from "react";
import { ReactSVG, Props as ReactSVGProps } from "react-svg";

interface Props extends Omit<ReactSVGProps, "ref"> {
  skillsetId: number;
}
export const SkillsetSVG: React.FC<Props> = ({ skillsetId, ...props }) => (
  <ReactSVG {...props} src={`/SkillsetIcons/${skillsetId}.svg`} />
);
