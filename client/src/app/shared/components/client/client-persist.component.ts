import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Client } from './client';
import { ClientService } from './client.service';
import { Response } from "@angular/http";
import { AddressService } from '../address/address.service';
import { Address } from '../address/address';
import { ClientUser } from '../clientUser/clientUser';
import { ClientUserService } from '../clientUser/clientUser.service';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { AddressDialog } from '../address/address-dialog';
import * as _ from "lodash";

@Component({
	selector: 'client-persist',
	templateUrl: './client-persist.component.html',
	styleUrls: ['./client.scss'],
	providers: [ClientService, ClientUserService, AddressService]
})
export class ClientPersistComponent implements OnInit {

	client = new Client();
	user = new ClientUser();
	create = true;
	createUser = true;
	errors: any[];
	userList: ClientUser[];
	pageHeading: string = 'Create Client';
	isLoading: boolean = false;
	addressDialogRef: MdDialogRef<AddressDialog>;
	private loggedInUser = sessionStorage.getItem("userId");

	constructor(private route: ActivatedRoute, private clientService: ClientService, private router: Router, private clientUserService: ClientUserService,
		private addressService: AddressService, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) { }

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			if (params.hasOwnProperty('id')) {
				this.clientService.get(+params['id']).subscribe((client: Client) => {
					this.create = false;
					this.client = client;
					this.pageHeading = 'Edit Client';
				});
			}
		});

		if (this.create) {
			this.client.clientId = _.random(0, 99999999).toString();
		}
	}

	save() {
		this.isLoading = true;
		if (this.client.id === undefined) {
			this.client.status = 'CREATED';
			this.client.createdBy = this.loggedInUser;
			this.client.updatedBy = this.loggedInUser;
		}
		this.clientService.save(this.client).subscribe((client: Client) => {
			this.isLoading = false;
			this.create = false;
			this.client = client;
			this.pageHeading = 'Edit Client';
		}, (res: Response) => {
			const json = res.json();
			if (json.hasOwnProperty('message')) {
				this.errors = [json];
			} else {
				this.errors = json._embedded.errors;
			}
		});
	}

	saveUser() {
		this.isLoading = true;
		this.clientUserService.save(this.user).subscribe((user: ClientUser) => {
			this.isLoading = false;
			this.createUser = false;
			this.user = user;

			// Add saved client user to client
			this.client.pointOfContact = user;
			this.clientService.save(this.client).subscribe((client: Client) => {
				this.client = client;
			});


		}, (res: Response) => {
			const json = res.json();
			if (json.hasOwnProperty('message')) {
				this.errors = [json];
			} else {
				this.errors = json._embedded.errors;
			}
		});
	}


	openAddAddressDialog() {

		this.isLoading = true;

		let config = new MdDialogConfig();
		config.disableClose = true;
		config.viewContainerRef = this.viewContainerRef;

		let addressData = { "mode": "add", "type": "C" };
		config.data = addressData;

		this.addressDialogRef = this.dialog.open(AddressDialog, config);

		this.addressDialogRef.afterClosed().subscribe(address => {
			if (address !== undefined) {

				// Add saved address to client
				this.client.registeredAddress = address;
				this.clientService.save(this.client).subscribe((client: Client) => {
					this.client = client;
				});
			}
			this.addressDialogRef = null;
			this.isLoading = false;
		});
	}


	editSample(samples: Address[]) {
		console.log('editing sample: ' + JSON.stringify(samples));
	}

	removeSample(samples: Address[]) {
		console.log('removing sample: ' + JSON.stringify(samples));
	}

	fieldChanged(event: any) {
		console.log('field changed');
		console.log(event);
	}

}
