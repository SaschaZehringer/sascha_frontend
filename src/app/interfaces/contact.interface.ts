import { IEmail } from "./email.interface";
import { IWebsite } from "./website.interface";


export interface IContact {
  emails: IEmail[];
  phone: string;
  country: string;
  city: string;
  websites: IWebsite[];
};
