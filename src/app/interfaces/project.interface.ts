import { IProjectLink } from "./project-link.interface";

export interface IProject {
  id: number;
  name: string;
  description: string;
  projectLinks: IProjectLink[];
}
