import { Component, OnInit, ViewContainerRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { TruckService } from './truck.service';
import { Truck } from './truck';
import { ConfirmationDialog } from '../confirmation/confirmation.component';
import { TruckDialog } from './truck-dialog.component';

@Component({
	selector: 'truck-list',
	templateUrl: './truck.component.html',
	styleUrls: ['./truck.scss'],
	providers: [TruckService]
})
export class TruckComponent implements OnInit {

	truckList: Truck[] = [];
	errors: any[];
	confirmationDialogRef: MdDialogRef<ConfirmationDialog>;
	truckDialogRef: MdDialogRef<TruckDialog>;
	isLoading: boolean = false;
	private loggedInUser = sessionStorage.getItem("userId");
	private companyId = sessionStorage.getItem("companyId");

	constructor(private truckService: TruckService, private route: ActivatedRoute, private router: Router,
		public dialog: MdDialog, public viewContainerRef: ViewContainerRef) { }

	ngOnInit() {
		this.truckService.findAllByCompanyId(+this.companyId).subscribe((truckList: Truck[]) => {
			this.truckList = truckList;
		});
	}


	openAddTruckDialog(truckId?: number) {
		this.isLoading = true;

		let config = new MdDialogConfig();
		config.disableClose = true;

		let userClientData = { "mode": truckId !== undefined ? "edit" : "add", "type": "C", "id": truckId };
		config.data = userClientData;

		this.truckDialogRef = this.dialog.open(TruckDialog, config);

		this.truckDialogRef.afterClosed().subscribe(clientUser => {
			if (clientUser !== undefined) {
				this.truckService.findAllByCompanyId(+this.companyId).subscribe((truckList: Truck[]) => {
					this.truckList = truckList;
				});
			}
			this.truckDialogRef = null;
			this.isLoading = false;
		});
	}

	editTruck(trucks: Truck[]) {
		this.openAddTruckDialog(trucks[0].id);
	}

	removeTruck(trucks: Truck[]) {

		this.isLoading = true;
		this.confirmationDialogRef = this.dialog.open(ConfirmationDialog, {
			disableClose: true,
			data: "Are you sure want to delete truck : " + trucks[0].licenseNumber
		});

		this.confirmationDialogRef.afterClosed().subscribe(msg => {
			if (msg) {
				trucks.forEach(screenAdd => {
					//	this.clientUserService.removeClientUser(screenAdd.id).subscribe(result => {
					//	});
				});
			}
			this.confirmationDialogRef = null;
			this.isLoading = false;
		}, error => {
			console.log("Error occured " + error);
		}, () => {
			this.truckService.findAllByCompanyId(+this.companyId).subscribe((truckList: Truck[]) => {
				this.truckList = truckList;
			});
		});
	}
}
