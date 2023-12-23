import { SanityBase } from "./SanityBase";

export interface MassageService extends SanityBase {
  duration: number;
  name: string;
  description: string;
}
