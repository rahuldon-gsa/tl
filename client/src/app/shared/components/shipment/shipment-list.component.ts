import {Component, OnInit} from '@angular/core';
import {ShipmentService} from './shipment.service';
import {Shipment} from './shipment';

@Component({
  selector: 'shipment-list',
  templateUrl: './shipment-list.component.html'
})
export class ShipmentListComponent implements OnInit {

  shipmentList: Shipment[] = [];

  constructor(private shipmentService: ShipmentService) { }

  ngOnInit() {
    this.shipmentService.list().subscribe((shipmentList: Shipment[]) => {
      this.shipmentList = shipmentList;
    });
  }
}
