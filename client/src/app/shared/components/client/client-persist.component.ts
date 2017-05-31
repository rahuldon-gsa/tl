import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Client } from './client';
import { ClientService } from './client.service';
import { Response } from "@angular/http";
import { AddressService } from '../address/address.service';
import { Address } from '../address/address';
import { UserService } from '../../../user/user.service';
import { User } from '../../../user/user';
import * as _ from "lodash";

@Component({
	selector: 'client-persist',
	templateUrl: './client-persist.component.html',
	styleUrls: ['./client.scss'],
	providers: [ClientService, UserService, AddressService]
})
export class ClientPersistComponent implements OnInit {

	client = new Client();
	create = true;
	errors: any[];
	addressList: Address[];
	userList: User[];
	pageHeading: string = 'Create Client';
	isLoading: boolean = false;
	private loggedInUser = sessionStorage.getItem("userId");

	constructor(private route: ActivatedRoute, private clientService: ClientService, private router: Router, private userService: UserService, private addressService: AddressService) { }

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			if (params.hasOwnProperty('id')) {
				this.clientService.get(+params['id']).subscribe((client: Client) => {
					this.create = false;
					this.client = client;
					this.pageHeading = 'Edit Client';
				});
			}
		});

		if (this.create) {
			this.client.clientId = _.random(0, 99999999).toString();
		}
	}

	save() {
		this.isLoading = true;
		if (this.client.id === undefined) {
			this.client.status = 'CREATED';
			this.client.createdBy = this.loggedInUser;
			this.client.updatedBy = this.loggedInUser;
		}
		this.clientService.save(this.client).subscribe((client: Client) => {
			this.isLoading = false;
			this.create = false;
			this.client = client;
			this.pageHeading = 'Edit Client';
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
