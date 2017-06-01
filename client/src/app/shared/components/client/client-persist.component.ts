import { Component, OnInit, ViewContainerRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Response } from "@angular/http";
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import * as _ from "lodash";

import { Client } from './client';
import { ClientService } from './client.service';
import { AddressService } from '../address/address.service';
import { Address } from '../address/address';
import { ClientUser } from '../clientUser/clientUser';
import { ClientUserService } from '../clientUser/clientUser.service';
import { AddressDialog } from '../address/address-dialog';
import { ConfirmationDialog } from '../confirmation/confirmation.component';
import { StatusType } from '../../enum/status-type';

@Component({
	selector: 'client-persist',
	templateUrl: './client-persist.component.html',
	styleUrls: ['./client.scss'],
	providers: [ClientService, ClientUserService, AddressService]
})
export class ClientPersistComponent implements OnInit, AfterViewChecked {

	client = new Client();
	user = new ClientUser();
	address = new Address();
	create = true;
	createUser = true;
	createAddress = true;
	errors: any[];
	userList: ClientUser[];
	addressList: Address[] = [];
	pageHeading: string = 'Create Client';
	isLoading: boolean = false;
	addressDialogRef: MdDialogRef<AddressDialog>;
	confirmationDialogRef: MdDialogRef<ConfirmationDialog>;
	countries = this.addressService.countries;
	stateList = [];
	private loggedInUser = sessionStorage.getItem("userId");

	constructor(private route: ActivatedRoute, private clientService: ClientService, private router: Router, private clientUserService: ClientUserService,
		private addressService: AddressService, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) {
	}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			if (params.hasOwnProperty('id')) {
				this.clientService.get(+params['id']).subscribe((client: Client) => {
					this.create = false;
					this.client = client;
					this.pageHeading = 'Edit Client';
					this.buildAddressList(client.addresses);

					if (client.registeredAddress !== undefined) {
						this.createAddress = false;
						this.addressService.addressById(client.registeredAddress.id).subscribe(dbAdd => {
							this.address = dbAdd;
						});
					}
				});
			}
		});

		if (this.create) {
			this.client.clientId = _.random(0, 99999999).toString();
		}
	}

	ngAfterViewChecked() {
		if (this.stateList.length < 1) {
			this.stateList = this.addressService.stateList;
			this.address.country = 'US';
		}
	}

	buildAddressList(addIds: Address[]) {
		if (addIds.length > 0) {
			this.addressList.length = 0;
			addIds.forEach(address => {
				this.addressService.addressById(address.id).subscribe(dbAdd => {

					// Do not add deleted address
					dbAdd.status = StatusType[dbAdd.status];
					this.addressList.push(dbAdd);
				});
			});
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

	countryUpdated() {
		if (this.address.country !== 'US') {
			this.address.state = undefined;
		}
	}

	saveAddress() {
		this.isLoading = true;
		this.address.type = 'C';

		this.addressService.save(this.address).subscribe((address: Address) => {
			this.createAddress = false;
			this.client.registeredAddress = address;
			this.clientService.save(this.client).subscribe((client: Client) => {
				this.client = client;
			});
			// Do not add address to the list, since it can only be one registered address
			//this.addressList.push(address);
			this.isLoading = false;
		}, (res: Response) => {
			const json = res.json();
			if (json.hasOwnProperty('message')) {
				this.errors = [json];
			} else {
				this.errors = json._embedded.errors;
			}
		});
	}


	openAddAddressDialog(addType: string, addId?: number) {

		this.isLoading = true;

		let config = new MdDialogConfig();
		config.disableClose = true;
		config.viewContainerRef = this.viewContainerRef;

		let addressData = { "mode": addId !== undefined ? "edit" : "add", "type": "C", "id": addId };
		config.data = addressData;

		this.addressDialogRef = this.dialog.open(AddressDialog, config);

		this.addressDialogRef.afterClosed().subscribe(address => {
			if (address !== undefined) {

				// Add to addresses list 
				this.client.addresses.push(address);

				this.clientService.save(this.client).subscribe((client: Client) => {
					this.client = client;
					this.buildAddressList(client.addresses);
				});
			}
			this.addressDialogRef = null;
			this.isLoading = false;
		});
	}


	editAddress(addresses: Address[]) {
		console.log('editing sample: ' + JSON.stringify(addresses));
		this.openAddAddressDialog('A', addresses[0].id);
	}

	removeAddress(addresses: Address[]) {

		this.isLoading = true;
		this.confirmationDialogRef = this.dialog.open(ConfirmationDialog, {
			//height: '400px',
			//width: '600px',
			disableClose: true,
			data: "Are you sure want to delete address : " + addresses[0].id
		});

		this.confirmationDialogRef.afterClosed().subscribe(msg => {
			if (msg) {
				this.addressService.removeAddress(addresses[0].id).subscribe(result => {
					this.clientService.get(this.client.id).subscribe((client: Client) => {
						this.buildAddressList(client.addresses);
					});
				});
			}
			this.confirmationDialogRef = null;
			this.isLoading = false;
		});
	}

	fieldChanged(event: any) {
		console.log('field changed');
		console.log(event);
	}

}
