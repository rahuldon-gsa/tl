import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShipmentService } from './shipment.service';
import { Shipment } from './shipment';
import { StatusType } from '../../enum/status-type';
import { Client } from '../client/client';

class ClintShip {
	clientId: number;
	shipId: number;
	clientName: string;
	shipType: string;
	status: string;
	shipmentId: number;
}

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

	private loggedInUser = sessionStorage.getItem("userId");
	private companyId = sessionStorage.getItem("companyId");

	clientList: Client[] = [];
	clientShipList: ClintShip[] = [];

	constructor(private shipmentService: ShipmentService, private router: Router) { }

	ngOnInit() {

		this.buildShipmentList();
	}

	buildShipmentList() {
		this.isLoading = true;

		// Get All Clients
		this.shipmentService.findAllClients(+this.companyId).subscribe(clients => {
			this.clientList = clients;

			// Set Shipment
			this.clientList.forEach(clientDb => {
				clientDb.shipments.forEach(ship => {
					this.shipmentService.get(ship.id).subscribe((shipment: Shipment) => {
						ship = shipment;
						this.buildClientShipList(shipment, clientDb);
					});
				});
			});
			this.isLoading = false;
		}, err => { }, () => {
			console.log(this.clientShipList);
		});
	}

	buildClientShipList(shipment: Shipment, client: Client) {
		let cship = new ClintShip();
		cship.clientId = +client.clientId;
		cship.shipId = +shipment.shipmentId;
		cship.clientName = client.name;
		cship.shipType = shipment.type;
		cship.shipmentId = shipment.id;
		cship.status = StatusType[shipment.status];
		this.clientShipList.push(cship);
	}

	editShipment(items: Shipment[]) {
		this.router.navigate(['ship/shipment', 'edit', items[0].shipmentId]);
	}

	removeShipment(items: Shipment[]) {
	}
}
