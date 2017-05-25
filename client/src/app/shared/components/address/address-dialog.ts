import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Address } from './address';
import { AddressService } from './address.service';
import { Response } from "@angular/http";
import * as _ from "lodash";
declare var System: any;

@Component({
	selector: 'address-dialog',
	templateUrl: './address-dialog.html',
	styleUrls: ['./address-dialog.css']
})
export class AddressDialog implements OnInit {

	address = new Address();
	create = true;
	errors: any[];
	stateList = [];

	countries = [
		{ code: 'US', description: 'USA' },
		{ code: 'CD', description: 'Canada' },
		{ code: 'MX', description: 'Mexico' }
	];

	constructor( @Inject(MD_DIALOG_DATA) data: any, public dialogRef: MdDialogRef<AddressDialog>, private route: ActivatedRoute, private addressService: AddressService) {

		System.import('../../data/states.json').then(file => {
			this.stateList = _.toArray(file);
		});

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
