import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Address } from './address';
import { AddressService } from './address.service';
import { Response } from "@angular/http";

@Component({
	selector: 'address-dialog',
	templateUrl: './address-dialog.html',
	styleUrls: ['./address-dialog.css']
})
export class AddressDialog implements OnInit {

	address = new Address();
	create = true;
	errors: any[];
	stateList = this.addressService.stateList;
	countries = this.addressService.countries;

	constructor( @Inject(MD_DIALOG_DATA) data: any, public dialogRef: MdDialogRef<AddressDialog>, private route: ActivatedRoute, private addressService: AddressService) {

		if (data !== undefined && data.mode === 'add') {
			this.address.country = this.countries[0].code;
			this.address.type = data.type;
		} else {
			this.addressService.addressById(data.id).subscribe((address: Address) => {
				this.create = false;
				this.address = address;
			});
		}
	}

	ngOnInit() {
	}

	countryUpdated() {
		if (this.address.country !== 'US') {
			this.address.state = undefined;
		}
	}

	saveAddress() {
		// Check if address is already exist for the client, client-persist.component.ts

		this.addressService.save(this.address).subscribe((address: Address) => {
			this.dialogRef.close(address);
		}, (res: Response) => {
			const json = res.json();
			if (json.hasOwnProperty('message')) {
				this.errors = [json];
			} else {
				this.errors = json._embedded.errors;
			}
		});
	}

}
