import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Address } from './address';
import { AddressService } from './address.service';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { AddressDialog } from './address-dialog';

@Component({
	selector: 'address-card',
	templateUrl: './address.component.html',
	styleUrls: ['./address.component.css'],
	providers: [AddressService]
})
export class AddressComponent implements OnInit {

	@Input() addressId: string;
	@Input() userId: string;
	dialogRef: MdDialogRef<AddressDialog>;

	isLoading: boolean = false;

	address: Address = new Address();

	constructor(private addressService: AddressService, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) { }

	ngOnInit() {
		if (this.addressId !== undefined) {
			this.addressService.addressById(+this.addressId).subscribe(
				data => {
					this.address = data;
				},
				error => {
					console.log("Error Getting Address :: ");
				});
		}
	}

	editAddress(addressId: number) {
		this.isLoading = true;

		let config = new MdDialogConfig();
		config.disableClose = true;
		config.viewContainerRef = this.viewContainerRef;

		let addressData = { "mode": "edit", "id": addressId };
		config.data = addressData;

		this.dialogRef = this.dialog.open(AddressDialog, config);

		this.dialogRef.afterClosed().subscribe(address => {
			if (address !== undefined) {
				this.address = address;
				this.dialogRef = null;
			}
			this.isLoading = false;

		});
	}

}
