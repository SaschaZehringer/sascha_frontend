import { IContact } from "./contact.interface";
import { ISummary } from "./summary.interface";

export interface IPersonalInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  contact: IContact;
  summary: ISummary[];
}
