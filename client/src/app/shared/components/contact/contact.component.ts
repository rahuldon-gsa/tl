import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { UserService } from '../../../user/user.service';
import { User } from '../../../user/user';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { ContactDialog } from './contact-dialog';

@Component({
	selector: 'contact-card',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

	@Input() currentUserId: number;
	dialogRef: MdDialogRef<ContactDialog>;

	isLoading: boolean = false;

	user: User = new User();
	constructor(private userService: UserService, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) { }

	ngOnInit() {

		if (this.currentUserId !== undefined) {
			this.userService.get(this.currentUserId).subscribe(
				data => {
					this.user = data;
				},
				error => {
					console.log("User Error :: ");
				});
		}
	}

	editContact(userId: number) {
		this.isLoading = true;

		let config = new MdDialogConfig();
		config.disableClose = true;
		config.viewContainerRef = this.viewContainerRef;

		let addressData = { "mode": "edit", "id": userId };
		config.data = addressData;

		this.dialogRef = this.dialog.open(ContactDialog, config);

		this.dialogRef.afterClosed().subscribe(updatedUser => {
			if (updatedUser !== undefined) {
				this.user = updatedUser;
			}
			this.dialogRef = null;
			this.isLoading = false;
		});
	}

}
