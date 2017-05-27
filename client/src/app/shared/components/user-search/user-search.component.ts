import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { User } from '../../../user/user';
@Component({
	selector: 'user-search-dialog',
	templateUrl: './user-search.component.html',
	styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

	models: User[];

	constructor( @Inject(MD_DIALOG_DATA) data: any, public dialogRef: MdDialogRef<UserSearchComponent>)
	{ }

	ngOnInit() {
		Promise.resolve(null).then(() => {
			let count = 32;
			this.models = Array.apply(0, Array(count))
				.map(function (element: any, index: any) {
					return {
						id: index,
						username: 'Name ' + index,
						email: 'Surname@' + index + '@gmail.com',
						dateOfBirth: (new Date().getTime() + (index * 10000010)),
						phoneNumber: (index % 2 == 1 ? 'search' : 'add')
					};
				});
		});
	}

}
