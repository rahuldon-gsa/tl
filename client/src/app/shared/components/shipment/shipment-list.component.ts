import { Component, OnInit } from '@angular/core';
import { ShipmentService } from './shipment.service';
import { Shipment } from './shipment';
import { StatusType } from '../../enum/status-type';

@Component({
	selector: 'shipment-list',
	templateUrl: './shipment-list.component.html',
	styleUrls: ['./../master.scss'],
	providers: [ShipmentService]
})
export class ShipmentListComponent implements OnInit {

	shipmentList: Shipment[] = [];
	errors: any[];
	isLoading: boolean = false;

	constructor(private shipmentService: ShipmentService) { }

	ngOnInit() {

	}

	buildShipmentList() {
		this.isLoading = true;
		this.shipmentList = [];
		this.shipmentService.list().subscribe((shipmentList: Shipment[]) => {
			shipmentList.forEach(ship => {
				ship.status = StatusType[ship.status];
				this.shipmentList.push(ship);
			});
			this.isLoading = false;
		});
	}
}
