import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../user/user';
import { DatePipe } from '@angular/common';
import { UserService } from '../../user/user.service';
@Component({
	selector: 'user-search-list',
	templateUrl: './user-search-list.component.html',
	styleUrls: ['./user-search.component.scss']
})
export class UserSearchListComponent implements OnInit {

	userList: User[] = [];
	filter: User = new User();
	constructor(private userService: UserService) { }

	ngOnInit() {

		// this.userService.findAllUserByCompanyId(1).subscribe((userList: User[]) => {
		// 	this.userList = userList;
		// });

		Promise.resolve(null).then(() => {
			let count = 32;
			this.userList = Array.apply(0, Array(count))
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
