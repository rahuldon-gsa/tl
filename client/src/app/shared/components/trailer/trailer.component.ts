import { Component, OnInit, ViewContainerRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { TrailerService } from './trailer.service';
import { Trailer } from './trailer';
import { TrailerDialog } from './trailer-dialog.component';
import { ConfirmationDialog } from '../confirmation/confirmation.component';
import { StatusType } from '../../enum/status-type';

@Component({
	selector: 'trailer-component',
	templateUrl: './trailer.component.html',
	styleUrls: ['./trailer.scss'],
	providers: [TrailerService]
})
export class TrailerComponent implements OnInit {

	trailerList: Trailer[] = [];
	errors: any[];
	confirmationDialogRef: MdDialogRef<ConfirmationDialog>;
	trailerDialogRef: MdDialogRef<TrailerDialog>;
	isLoading: boolean = false;
	private loggedInUser = sessionStorage.getItem("userId");
	private companyId = sessionStorage.getItem("companyId");

	constructor(private trailerService: TrailerService, private route: ActivatedRoute, private router: Router,
		public dialog: MdDialog, public viewContainerRef: ViewContainerRef) { }

	ngOnInit() {
		this.buildTrailerList();
	}

	buildTrailerList() {
		this.trailerList = [];
		this.trailerService.findAllByCompanyId(+this.companyId).subscribe((trailerList: Trailer[]) => {
			trailerList.forEach(trailer => {
				trailer.status = StatusType[trailer.status];
				this.trailerList.push(trailer);
			});
		});
	}

	openAddTrailerDialog(truckId?: number) {
		this.isLoading = true;

		let config = new MdDialogConfig();
		config.disableClose = true;

		let userClientData = { "mode": truckId !== undefined ? "edit" : "add", "type": "C", "id": truckId };
		config.data = userClientData;

		this.trailerDialogRef = this.dialog.open(TrailerDialog, config);

		this.trailerDialogRef.afterClosed().subscribe(clientUser => {
			if (clientUser !== undefined) {
				this.buildTrailerList();
			}
			this.trailerDialogRef = null;
			this.isLoading = false;
		});
	}

	editTrailer(trucks: Trailer[]) {
		this.openAddTrailerDialog(trucks[0].id);
	}

	removeTrailer(trucks: Trailer[]) {

		this.isLoading = true;
		this.confirmationDialogRef = this.dialog.open(ConfirmationDialog, {
			disableClose: true,
			data: "Are you sure want to delete trailer : " + trucks[0].licenseNumber
		});

		this.confirmationDialogRef.afterClosed().subscribe(msg => {
			if (msg) {
				trucks.forEach(screenAdd => {
					this.trailerService.removeTrailer(screenAdd.id).subscribe(result => {
					});
				});
			}
			this.confirmationDialogRef = null;
			this.isLoading = false;
		}, error => {
			console.log("Error occured " + error);
		}, () => {
			this.buildTrailerList();
		});
	}
}
