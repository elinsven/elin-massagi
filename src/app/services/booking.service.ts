import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Booking {
  bookingid?: string;
  starttime: string;
  endtime: string;
  bodypart: string[];
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl: string = environment.baseUrl;
  private apiUrl: string = this.baseUrl + '/bookings/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  public bookingAction = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  public getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  public getBookingById(id): Observable<Booking> {
    const url = `${this.apiUrl}${id}`;
    return this.http.get<Booking>(url).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public addBooking(body): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, body).pipe(
      tap(() => {
        this.bookingAction.next(true);
      })
    );
  }

  public updateBooking(id, body): Observable<Booking> {
    const url = `${this.apiUrl}${id}`;
    return this.http.put<Booking>(url, body).pipe(
      tap(() => {
        this.bookingAction.next(true);
      })
    );
  }

  public deleteBooking(id): void {
    const url = `${this.apiUrl}${id}`;
    this.http.delete(url, this.httpOptions).subscribe(() => {
      this.bookingAction.next(true);
    });
  }
}
