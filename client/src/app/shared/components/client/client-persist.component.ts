import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Client } from './client';
import { ClientService } from './client.service';
import { Response } from "@angular/http";
import { AddressService } from '../address/address.service';
import { Address } from '../address/address';
import { UserService } from '../../../user/user.service';
import { User } from '../../../user/user';
@Component({
	selector: 'client-persist',
	templateUrl: './client-persist.component.html'
})
export class ClientPersistComponent implements OnInit {

	client = new Client();
	create = true;
	errors: any[];
	addressList: Address[];
	userList: User[];

	constructor(private route: ActivatedRoute, private clientService: ClientService, private router: Router, private userService: UserService, private addressService: AddressService) { }

	ngOnInit() {
		this.addressService.list().subscribe((addressList: Address[]) => { this.addressList = addressList; });
		this.userService.list().subscribe((userList: User[]) => { this.userList = userList; });
		this.addressService.list().subscribe((addressList: Address[]) => { this.addressList = addressList; });
		this.route.params.subscribe((params: Params) => {
			if (params.hasOwnProperty('id')) {
				this.clientService.get(+params['id']).subscribe((client: Client) => {
					this.create = false;
					this.client = client;
				});
			}
		});
	}

	save() {
		this.clientService.save(this.client).subscribe((client: Client) => {
			this.router.navigate(['/client', 'show', client.id]);
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
