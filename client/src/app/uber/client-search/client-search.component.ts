import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { User } from '../../user/user';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { DatePipe } from '@angular/common';
import { UserService } from '../../user/user.service';
import { UserDialog } from '../../user/user-dialog';
import { ClientService } from '../../shared/components/client/client.service';
import { Client } from '../../shared/components/client/client';

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

	constructor(private clientService: ClientService, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) { }

	ngOnInit() {
		this.clientService.findAllByCompanyId(1).subscribe((clientList: Client[]) => {
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

	editSample(samples: User[]) {
		console.log('editing sample: ' + JSON.stringify(samples));
	}

	removeSample(samples: User[]) {
		console.log('removing sample: ' + JSON.stringify(samples));
	}

	fieldChanged(event: any) {
		console.log('field changed');
		console.log(event);
	}

}

