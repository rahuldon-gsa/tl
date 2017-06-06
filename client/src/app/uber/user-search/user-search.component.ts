import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { User } from '../../user/user';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { DatePipe } from '@angular/common';
import { UserService } from '../../user/user.service';
import { UserDialog } from '../../user/user-dialog';

@Component({
	selector: 'user-search',
	templateUrl: './user-search.component.html',
	styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

	userList: User[];
	responsive: boolean = true;
	isLoading: boolean = false;
	addUserDialogRef: MdDialogRef<UserDialog>;

	private companyId = sessionStorage.getItem("companyId");

	constructor(private userService: UserService, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) { }

	ngOnInit() {
		this.userService.findAllUserByCompanyId(+this.companyId).subscribe((userList: User[]) => {
			this.userList = userList;
		});
	}

	_sortByBirthDate(a: User, b: User, sortDir: string) {
		let dir = sortDir == 'asc' ? 1 : -1;
		if (a.dateOfBirth < b.dateOfBirth) return -1 * dir;
		if (a.dateOfBirth > b.dateOfBirth) return 1 * dir;
		return 0;
	}

	_filterByBirthDate(a: User, text: string) {
		let datePipe = new DatePipe("pt");
		let value = datePipe.transform(a.dateOfBirth, 'dd/MM/yyyy');
		return value.toString().toUpperCase().indexOf(text.toUpperCase()) > -1;
	}

	addUser(userId?: number) {
		this.isLoading = true;

		let userConfig = new MdDialogConfig();
		userConfig.disableClose = true;
		userConfig.viewContainerRef = this.viewContainerRef;
		let userData = { "mode": "add" };
		userConfig.data = userData;

		this.addUserDialogRef = this.dialog.open(UserDialog, userConfig);

		this.addUserDialogRef.afterClosed().subscribe(user => {
			if (user !== undefined) {
				// Move to company add user
			}

			// Getting fresh list from DB after adding new record
			this.userService.findAllUserByCompanyId(+this.companyId).subscribe((userList: User[]) => {
				this.userList = userList;
			});

			this.addUserDialogRef = null;
			this.isLoading = false;
		});
	}

	removeUser(samples: User[]) {
		console.log('removing sample: ' + JSON.stringify(samples));
	}

	fieldChanged(event: any) {
		console.log('field changed');
		console.log(event);
	}

}
