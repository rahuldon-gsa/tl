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
		//config.viewContainerRef = this.viewContainerRef;
		//config.height = "500px";
		//config.width = "750px";

		let userClientData = { "mode": truckId !== undefined ? "edit" : "add", "type": "C", "id": truckId };
		config.data = userClientData;

		this.truckDialogRef = this.dialog.open(TruckDialog, config);

		this.truckDialogRef.afterClosed().subscribe(clientUser => {
			if (clientUser !== undefined) {

				/*
				// Add to addresses list 
				this.client.users.push(clientUser);

				this.clientService.save(this.client).subscribe((client: Client) => {
					this.client = client;
					this.buildUserList(this.client.users);
				});
				*/
			}
			this.truckDialogRef = null;
			this.isLoading = false;
		});
	}
}
