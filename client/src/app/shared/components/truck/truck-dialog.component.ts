import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdNativeDateModule } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Truck } from './truck';
import { TruckService } from './truck.service';
import { Response } from "@angular/http";
import * as _ from "lodash";

@Component({
	selector: 'truck-dialog',
	templateUrl: './truck-dialog.component.html',
	styleUrls: ['./truck.scss'],
	providers: [TruckService]
})
export class TruckDialog implements OnInit {

	truck = new Truck();
	create: boolean = true;
	errors: any[];
	isMoreDetails: boolean = false;

	truckTypes = this.truckService.truckTypes;
	classTypes = this.truckService.classTypes;
	fuelTypes = this.truckService.fuelTypes;
	inspectionTypes = this.truckService.inspectionTypes;
	insuranceTypes = this.truckService.insuranceTypes;
	permitTypes = this.truckService.permitTypes;

	private loggedInUser = sessionStorage.getItem("userId");

	constructor( @Inject(MD_DIALOG_DATA) data: any, public dialogRef: MdDialogRef<TruckDialog>, private route: ActivatedRoute, private truckService: TruckService, private router: Router) {

		if (data !== undefined && data.mode === 'add') {
			this.truck.truckId = _.random(0, 99999999).toString();
		} else {
			this.truckService.get(data.id).subscribe((truck: Truck) => {
				this.create = false;
				this.truck = truck;
			});
		}

	}

	isMoreDetailRequired() {
		this.isMoreDetails = !this.isMoreDetails;
	}
	ngOnInit() {

	}

	saveTruck() {

		if (this.create) {
			this.truck.status = 'CREATED';
			this.truck.createdBy = this.loggedInUser;
			this.truck.updatedBy = this.loggedInUser;
		} else {
			this.truck.updatedBy = this.loggedInUser;
		}

		this.truckService.save(this.truck).subscribe((truck: Truck) => {
			this.dialogRef.close(truck);
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
