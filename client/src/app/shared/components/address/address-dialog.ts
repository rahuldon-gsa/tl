import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Address } from './address';
import { AddressService } from './address.service';
import { Response } from "@angular/http";
import * as _ from "lodash";
declare var System: any;

@Component({
	selector: 'address-dialog',
	templateUrl: './address-dialog.html',
	styleUrls: ['./address-dialog.css'],
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

	constructor(public dialogRef: MdDialogRef<AddressDialog>, private route: ActivatedRoute, private addressService: AddressService, private router: Router) {
		this.address.country = this.countries[0].code;
	}

	ngOnInit() {

		System.import('../../data/states.json').then(file => {
			this.stateList = _.toArray(file);
		});


		this.route.params.subscribe((params: Params) => {
			if (params.hasOwnProperty('id')) {
				this.addressService.get(+params['id']).subscribe((address: Address) => {
					this.create = false;
					this.address = address;
				});
			}
		});
	}
}
