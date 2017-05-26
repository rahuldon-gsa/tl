import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user';
import * as _ from "lodash";

@Component({
	selector: 'user-dialog',
	templateUrl: './user-dialog.html',
	styleUrls: ['./user-card.scss']
})
export class UserDialog implements OnInit {

	user = new User();
	create = true;
	errors: any[];
	designationTypes = [];
	isFullDetails: boolean = false;
	constructor( @Inject(MD_DIALOG_DATA) data: any, public dialogRef: MdDialogRef<UserDialog>, private route: ActivatedRoute, private router: Router, private userService: UserService) {
		this.designationTypes = this.userService.designationTypes;
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

	isMoreDetailRequired() {
		this.isFullDetails = !this.isFullDetails;
	}
}
