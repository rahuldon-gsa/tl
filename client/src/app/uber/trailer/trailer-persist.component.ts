import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Trailer } from './trailer';
import { TrailerService } from './trailer.service';
import { Response } from "@angular/http";
import { User } from './../../user/user';
import { AddressService } from './../../shared/components/address/address.service';
import { Address } from './../../shared/components/address/address';
import { UserService } from './../../user/user.service';

@Component({
	selector: 'trailer-persist',
	templateUrl: './trailer-persist.component.html'
})
export class TrailerPersistComponent implements OnInit {

	trailer = new Trailer();
	create = true;
	errors: any[];
	userList: User[];
	addressList: Address[];

	constructor(private route: ActivatedRoute, private trailerService: TrailerService, private router: Router, private userService: UserService, private addressService: AddressService) { }

	ngOnInit() {
		this.userService.list().subscribe((userList: User[]) => { this.userList = userList; });
		this.addressService.list().subscribe((addressList: Address[]) => { this.addressList = addressList; });
		this.route.params.subscribe((params: Params) => {
			if (params.hasOwnProperty('id')) {
				this.trailerService.get(+params['id']).subscribe((trailer: Trailer) => {
					this.create = false;
					this.trailer = trailer;
				});
			}
		});
	}

	save() {
		this.trailerService.save(this.trailer).subscribe((trailer: Trailer) => {
			this.router.navigate(['/trailer', 'show', trailer.id]);
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
