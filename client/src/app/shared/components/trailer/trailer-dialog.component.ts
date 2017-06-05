import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdNativeDateModule } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as _ from "lodash";
import { Trailer } from './trailer';
import { TrailerService } from './trailer.service';
import { Response } from "@angular/http";
import { User } from '../../../user/user';
import { AddressService } from './../address/address.service';
import { Address } from './../address/address';
import { UserService } from '../../../user/user.service';

@Component({
	selector: 'trailer-dialog',
	templateUrl: './trailer-dialog.component.html',
	styleUrls: ['./trailer.scss'],
	providers: [TrailerService]
})
export class TrailerDialog implements OnInit {

	trailer = new Trailer();
	create = true;
	errors: any[];
	userList: User[];
	addressList: Address[];
	trailerOwner: any;
	trailerAdd: any;

	trailerTypes = this.trailerService.trailerTypes;
	weightTypes = this.trailerService.weightTypes;

	constructor( @Inject(MD_DIALOG_DATA) data: any, public dialogRef: MdDialogRef<TrailerDialog>,
		private route: ActivatedRoute, private trailerService: TrailerService, private router: Router) {

		if (data !== undefined && data.mode === 'add') {
			this.trailer.trailerId = _.random(0, 99999999).toString();
		} else {
			this.trailerService.get(data.id).subscribe((trailer: Trailer) => {
				this.create = false;
				this.trailer = trailer;
				this.trailerOwner = trailer.owner.id;
				this.trailerAdd = trailer.permanentAddress.id;
			});
		}
	}

	ngOnInit() {
		this.trailerService.getAllAddresses().subscribe(addList => {
			this.addressList = addList;
		});

		this.trailerService.getAllUsers().subscribe(userList => {
			this.userList = userList;
		});
	}

	saveTrailer() {
		this.trailer.owner = this.trailerOwner;
		this.trailer.permanentAddress = this.trailerAdd;
		this.trailerService.save(this.trailer).subscribe((trailer: Trailer) => {
			this.dialogRef.close(trailer);
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
