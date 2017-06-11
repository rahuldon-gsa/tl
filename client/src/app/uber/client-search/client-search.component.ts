import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { DatePipe } from '@angular/common';
import { UserService } from '../../user/user.service';
import { UserDialog } from '../../user/user-dialog';
import { ClientService } from '../../shared/components/client/client.service';
import { Client } from '../../shared/components/client/client';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-client-search',
	templateUrl: './client-search.component.html',
	styleUrls: ['./client-search.component.scss'],
	providers: [ClientService]
})
export class ClientSearchComponent implements OnInit {

	clientList: Client[];
	responsive: boolean = true;
	isLoading: boolean = false;
	addUserDialogRef: MdDialogRef<UserDialog>;

	private loggedInUser = sessionStorage.getItem("userId");
	private companyId = sessionStorage.getItem("companyId");

	constructor(private router: Router,
		private clientService: ClientService, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) { }

	ngOnInit() {
		this.clientService.findAllByCompanyId(+this.companyId).subscribe((clientList: Client[]) => {
			this.clientList = clientList;
		});
	}

	addSample() {
		this.isLoading = true;

		let userConfig = new MdDialogConfig();
		userConfig.disableClose = true;
		userConfig.viewContainerRef = this.viewContainerRef;
		let userData = { "mode": "add" };
		userConfig.data = userData;

		this.addUserDialogRef = this.dialog.open(UserDialog, userConfig);

		this.addUserDialogRef.afterClosed().subscribe(user => {
			if (user !== undefined) {
				alert("User Added");
			}

			// Getting fresh list from DB after adding new record
			this.clientService.findAllByCompanyId(1).subscribe((clientList: Client[]) => {
				this.clientList = clientList;
			});

			this.addUserDialogRef = null;
			this.isLoading = false;
		});
	}

	editClient(client: Client[]) {
		this.router.navigate(['clients/client/edit/' + client[0].id], { skipLocationChange: true });
	}

	removeClient(samples: Client) {
		console.log('removing sample: ' + JSON.stringify(samples));
	}

	fieldChanged(event: any) {
		console.log('field changed');
		console.log(event);
	}

}

