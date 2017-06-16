import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShipmentService } from '../../shared/components/shipment/shipment.service';
import { Shipment } from '../../shared/components/shipment/shipment';
import { Client } from '../../shared/components/client/client';
import { StatusType } from '../../shared/enum/status-type';
import { LoadService } from '../../shared/components/load/load.service';

class ClintShip {
	clientId: number;
	shipId: number;
	clientName: string;
	shipType: string;
	status: string;
	shipmentId: number;
}

@Component({
	selector: 'ship-list',
	templateUrl: './ship-list.component.html',
	styleUrls: ['./ship.component.scss'],
	providers: [ShipmentService, LoadService]
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
		this.router.navigate(['../ship', 'edit', items[0].shipmentId]);
	}

	removeShipment(items: Shipment[]) {
	}
}
