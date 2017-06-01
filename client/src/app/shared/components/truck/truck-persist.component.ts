import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Truck } from './truck';
import { TruckService } from './truck.service';
import { Response } from "@angular/http";
import { User } from '../../../user/user';
import { AddressService } from './../address/address.service';
import { Address } from './../address/address';
import { UserService } from '../../../user/user.service';

@Component({
	selector: 'truck-persist',
	templateUrl: './truck-persist.component.html'
})
export class TruckPersistComponent implements OnInit {

	truck = new Truck();
	create = true;
	errors: any[];
	userList: User[];
	addressList: Address[];

	constructor(private route: ActivatedRoute, private truckService: TruckService, private router: Router, private userService: UserService, private addressService: AddressService) { }

	ngOnInit() {
		this.userService.list().subscribe((userList: User[]) => { this.userList = userList; });
		this.addressService.list().subscribe((addressList: Address[]) => { this.addressList = addressList; });
		this.route.params.subscribe((params: Params) => {
			if (params.hasOwnProperty('id')) {
				this.truckService.get(+params['id']).subscribe((truck: Truck) => {
					this.create = false;
					this.truck = truck;
				});
			}
		});
	}

	save() {
		this.truckService.save(this.truck).subscribe((truck: Truck) => {
			this.router.navigate(['/truck', 'show', truck.id]);
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
