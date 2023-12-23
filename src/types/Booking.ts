import { SanityBase } from "./SanityBase";
import { MassageService } from "./MassageService";

export interface Booking extends SanityBase {
  bookingDate: Date;
  startTime: string;
  massageService: MassageService;
}
