import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Register } from './register';
import { RegisterService } from './register.service';
import { Response } from "@angular/http";
import { GlobalEventsManager } from '../shared/services/global-events-manager';
import { User } from '../user/user';

@Component({
	selector: 'register-persist',
	templateUrl: './register-persist.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterPersistComponent implements OnInit {

	register = new Register();
	user = new User();
	create = true;
	errors: any[];
	genders = ['Male', 'Female', 'Other'];
	selectedGender: string;

	constructor(private route: ActivatedRoute, private registerService: RegisterService, private router: Router, private globalEventsManager: GlobalEventsManager) { }

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			if (params.hasOwnProperty('id')) {
				this.registerService.get(+params['id']).subscribe((register: Register) => {
					this.create = false;
					this.register = register;
				});
			}
		});
	}

	save() {
		this.registerService.registerUser(this.user).subscribe((success: boolean) => {
			this.router.navigate(['/login'], { queryParams: { 'msg': 'User registration successful !!' } });
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
