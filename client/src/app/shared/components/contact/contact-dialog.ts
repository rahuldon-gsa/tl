import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../../../user/user';
import { UserService } from '../../../user/user.service';
import { Response } from "@angular/http";
import * as _ from "lodash";
declare var System: any;

@Component({
	selector: 'contact-dialog',
	templateUrl: './contact-dialog.html',
	styleUrls: ['./contact-dialog.css']
})
export class ContactDialog implements OnInit {

	user = new User();
	create = true;
	errors: any[];

	constructor( @Inject(MD_DIALOG_DATA) data: any, public dialogRef: MdDialogRef<ContactDialog>, private route: ActivatedRoute, private userService: UserService) {

		if (data !== undefined && data.mode === 'add') {
		} else {
			this.userService.get(data.id).subscribe((user: User) => {
				this.create = false;
				this.user = user;
			});
		}
	}

	ngOnInit() {
	}

	saveContact() {
		this.userService.save(this.user).subscribe((user: User) => {
			this.dialogRef.close(user);
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
