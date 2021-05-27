import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReservationsService } from '../services/reservation.service';
import { AddReservationComponent, Reservation } from './add-reservation/add-reservation.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  reservations: Reservation[];

  constructor(public modalController: ModalController, private _reservationService: ReservationsService) {
    _reservationService.getAllReservation().subscribe(res => {
      console.log(res);
      this.reservations = res;
    });

  }

  async openModal() {
    const modal = await this.modalController.create({
      component: AddReservationComponent,
      swipeToClose: true,
      
    });

    

    return await modal.present();
  }
}
