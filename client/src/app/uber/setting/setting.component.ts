import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AddressService } from '../../shared/components/address/address.service';
import { AddressPersistComponent } from '../../shared/components/address/address-persist.component';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { PizzaDialog } from './pizza-dialog';
import { AddressDialog } from '../../shared/components/address/address-dialog';

@Component({
	selector: 'app-setting',
	templateUrl: './setting.component.html',
	styleUrls: ['./setting.component.scss'],
	providers: [AddressService]
})
export class SettingComponent implements OnInit {

	primaryContactId: string;
	homeAddId: number;
	workAddId: number;

	dialogRef: MdDialogRef<AddressDialog>;

	constructor(private addressService: AddressService, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) { }

	ngOnInit() {

		this.primaryContactId = sessionStorage.getItem("userId");

		// Get Addresses based on the userId
		this.addressService.addressListByUserId(+this.primaryContactId).subscribe(addressList => {
			console.log(addressList);
			if (addressList.length > 0) {

			} else {
				this.homeAddId = 0;
				this.workAddId = 0;
			}
		});
	}

	openAddAddressDialog(addType: string) {

		let config = new MdDialogConfig();
		config.disableClose = true;
		config.viewContainerRef = this.viewContainerRef;

		this.dialogRef = this.dialog.open(AddressDialog, config);

		this.dialogRef.afterClosed().subscribe(result => {
			console.log('result: ' + result);
			this.dialogRef = null;
		});

		// let dialogRef = this.dialog.open(DialogResultExampleDialog);
		// dialogRef.afterClosed().subscribe(result => {
		//   alert(result);
		// });
	}
} 