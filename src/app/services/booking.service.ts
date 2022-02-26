import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, collectionData, docData, updateDoc, deleteDoc  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface BookingForm {
  id?: string,
  title: string,
  start: any,
  end: any,
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private fireStore: Firestore) { }

  getBookings(): Observable<BookingForm[]> {
    const bookingRef = collection(this.fireStore, "bookings");
    return collectionData(bookingRef, {idField: "id"}) as  Observable<BookingForm[]>;
  }

  getBookingById(id): Observable<BookingForm> {
    const bookingDocRef = doc(this.fireStore, `bookings/${id}`);
    return docData(bookingDocRef, {idField: "id"}) as  Observable<BookingForm>;
  }

  addBooking(booking: BookingForm) {
    const bookingRef = collection(this.fireStore, "bookings");
    return addDoc(bookingRef, booking);
  }

  deleteBooking(booking: BookingForm) {
    const bookingDocRef = doc(this.fireStore, `bookings/${booking.id}`);
    return deleteDoc(bookingDocRef);
  }

  updateBooking(booking: BookingForm) {
    const bookingDocRef = doc(this.fireStore, `bookings/${booking.id}`);
    return updateDoc(bookingDocRef, {title: booking.title, start: booking.start, end: booking.end});
  }

}


