import { Component, OnInit, ViewContainerRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { DatePipe } from '@angular/common';
import { ShipmentService } from './shipment.service';
import { Shipment } from './shipment';
import { Load } from '../load/load';
import { Location } from '../location/location';
import { LocationService } from '../location/location.service';
import { ItemDialog } from '../item/item-dialog.component';
import { Item } from '../item/item';
import { ItemService } from '../item/item.service';
import { ConfirmationDialog } from '../confirmation/confirmation.component';
import { Response } from "@angular/http";
import { Client } from '../client/client';
import * as _ from "lodash";

declare var google: any;

export enum ScreenStep {
	INIT, LOAD, ITEM, ADDR
}

@Component({
	selector: 'shipment-create',
	templateUrl: './shipment.component.html',
	styleUrls: ['./../master.scss'],
	providers: [ShipmentService, LocationService, DatePipe, ItemService]
})
export class ShipmentComponent implements OnInit {

	private loggedInUser = sessionStorage.getItem("userId");
	private companyId = sessionStorage.getItem("companyId");

	shipment = new Shipment();
	isLoading: boolean = false;

	create = true;
	errors: any[];
	clientName: string;
	clientList: Client[] = [];
	shipmentTypes = ['Full Truckload', 'Less Than Truckload', 'International'];
	shipmentType: string;
	clientShipId = [];

	screenStep: string;

	constructor(private itemService: ItemService, private datePipe: DatePipe, private route: ActivatedRoute, private shipmentService: ShipmentService, private router: Router,
		public dialog: MdDialog, public viewContainerRef: ViewContainerRef, private locationService: LocationService) {

		// Get All Clients
		this.shipmentService.findAllClients(+this.companyId).subscribe(clients => {
			this.clientList = clients;
			clients.forEach(client => {
				client.shipments.forEach(ship => {
					this.clientShipId.push({ clientId: client.id, shipId: ship.id, clientName: client.name });
					if (ship.id === this.shipment.id) {
						this.clientName = client.name;
					}
				});
			});
		});
	}

	ngOnInit() {
		this.screenStep = ScreenStep[ScreenStep.INIT];
		this.route.params.subscribe((params: Params) => {

			if (params.hasOwnProperty('id')) {
				this.shipmentService.get(+params['id']).subscribe((shipment: Shipment) => {
					this.create = false;
					this.shipment = shipment;
					this.shipmentType = shipment.type;
				});
			} else {
				this.shipment.shipmentId = _.random(0, 99999999).toString();
			}
		});
	}

	saveShipment() {
		this.isLoading = true;
		this.shipmentService.save(this.shipment).subscribe((shipmentDb: Shipment) => {
			this.isLoading = false;
			this.shipment = shipmentDb;

			/*
			// Attach shipment to client
			this.shipmentService.getClient(+this.clientName).subscribe(client => {
				client.shipments.push(this.shipment);
				this.shipmentService.attachShipmentToClient(client).subscribe(res => {
					console.log("Client saved with shipments " + client.shipments)
				});
			});
			*/


			this.clientShipId.forEach(chid => {
				if (chid.clientId === this.clientName) {
					this.clientName = chid.clientName;
				}
			});

		}, (res: Response) => {
			const json = res.json();
			if (json.hasOwnProperty('message')) {
				this.errors = [json];
			} else {
				this.errors = json._embedded.errors;
			}
		}, () => {

		});
	}

}
