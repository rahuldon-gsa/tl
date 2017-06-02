import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClientUser } from './clientUser';
import { ClientUserService } from './clientUser.service';
import { Response } from "@angular/http";

@Component({
	selector: 'client-user-dialog',
	templateUrl: './clientUser-dialog.html',
	styleUrls: ['./clientUser.scss'],
	providers: [ClientUserService]
})
export class ClientUserDialog implements OnInit {

	clientUser = new ClientUser();
	create = true;
	errors: any[];

	constructor( @Inject(MD_DIALOG_DATA) data: any, public dialogRef: MdDialogRef<ClientUserDialog>, private route: ActivatedRoute, private clientUserService: ClientUserService) {

		if (data !== undefined && data.mode === 'add') {
			this.clientUser.type = data.type;
		} else {
			this.clientUserService.clientUserById(data.id).subscribe(dbUser => {
				this.create = false;
				this.clientUser = dbUser;
			});
		}
	}

	ngOnInit() {
	}

	saveClientUser() {
		this.clientUserService.save(this.clientUser).subscribe((clientUser: ClientUser) => {
			this.dialogRef.close(clientUser);
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
