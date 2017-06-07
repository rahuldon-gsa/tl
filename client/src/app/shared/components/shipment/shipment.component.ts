import { Component, OnInit } from '@angular/core';
import { ShipmentService } from './shipment.service';
import { Shipment } from './shipment';

@Component({
	selector: 'shipment-list',
	templateUrl: './shipment.component.html'
})
export class ShipmentComponent implements OnInit {

	shipmentList: Shipment[] = [];
	headingVal: string;

	constructor(private shipmentService: ShipmentService) { }

	ngOnInit() {

		this.headingVal = 'Create Shipment';
		this.shipmentService.list().subscribe((shipmentList: Shipment[]) => {
			this.shipmentList = shipmentList;
		});
	}
}
