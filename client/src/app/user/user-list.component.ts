import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

@Component({
	selector: 'user-list',
	templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

	userList: User[] = [];

	constructor(private userService: UserService) { }

	ngOnInit() {
		this.userService.findAllUserByCompanyId(1).subscribe((userList: User[]) => {
			this.userList = userList;
		});
	}
}
