import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-payment',
  templateUrl: 'modal-payment.component.html',
  styleUrls: ['modal-payment.component.scss']
 })

 export class ModalPaymentComponent {

  packs = [
    {
      id: 1,
      hours: 10,
      price: 200
    }, {
      id: 2,
      hours: 20,
      price: 380
    }, {
      id: 2,
      hours: 50,
      price: 800
    }
  ]

  @Input() event: any;


  modal(){
    this.event = false;
  }


}
