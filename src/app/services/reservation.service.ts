import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Reservation } from "../tab3/add-reservation/add-reservation.component";

@Injectable({
    providedIn: 'root'
})
export class ReservationsService {

    constructor(private http: HttpClient) {}

    getAllReservation() {
        return this.http.get<Reservation[]>("https://localhost:5001/api/Reservations");
    }

    postReservation(reservation: Reservation) {
        return this.http.post<Reservation>("https://localhost:5001/api/Reservations", reservation);
    }   
}