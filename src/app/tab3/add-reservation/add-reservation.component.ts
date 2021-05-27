import { Component } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { ReservationsService } from "src/app/services/reservation.service";

export class Reservation {
    clubReservationComment: string;
    startTime: Date;
    finishTime: Date;
    timeOfCreation: Date;
}

@Component({
    selector: 'app-add-reservation',
    templateUrl: 'add-reservation.component.html',
    styleUrls: ['add-reservation.component.scss']
})

export class AddReservationComponent {
    reservation: Reservation;
  
    constructor(public modalController: ModalController, private _reservationsService: ReservationsService) {
        this.reservation = new Reservation();
    }

    closeModal() {
        this.modalController.dismiss();
    }

    addReservation() {
        this._reservationsService.postReservation(this.reservation).subscribe(res => console.log(res));
        console.log(this.reservation);
    }
}