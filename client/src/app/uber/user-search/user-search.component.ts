import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../user/user';
@Component({
	selector: 'user-search',
	templateUrl: './user-search.component.html',
	styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

	models: User[];

	constructor() { }

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
