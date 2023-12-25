import { MassageService } from "./MassageService";

export interface Booking {
  id: string;
  bookingDate: Date;
  startTime: string;
  massageService: MassageService;
}
