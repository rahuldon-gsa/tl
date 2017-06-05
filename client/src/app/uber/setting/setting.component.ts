import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AddressService } from '../../shared/components/address/address.service';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { AddressDialog } from '../../shared/components/address/address-dialog';
import { ContactDialog } from '../../shared/components/contact/contact-dialog';
import { Address } from '../../shared/components/address/address';
import { Company } from '../../shared/components/company/company';
import { CompanyService } from '../../shared/components/company/company.service';
import * as _ from "lodash";

@Component({
	selector: 'app-setting',
	templateUrl: './setting.component.html',
	styleUrls: ['./setting.component.scss'],
	providers: [AddressService, CompanyService]
})
export class SettingComponent implements OnInit {

	primaryContactId: string;
	homeAdd: Address = null;
	workAdd: Address = null;
	isLoading: boolean = false;

	dialogRef: MdDialogRef<AddressDialog>;
	contactDialogRef: MdDialogRef<ContactDialog>;
	private companyId = sessionStorage.getItem("companyId");
	company: Company;

	constructor(private addressService: AddressService, private companyService: CompanyService,
		public dialog: MdDialog, public viewContainerRef: ViewContainerRef) { }

	ngOnInit() {

		this.primaryContactId = sessionStorage.getItem("userId");

		// Get Company 
		this.companyService.get(+this.companyId).subscribe(com => {
			this.company = com;
		});

		// Get Addresses based on the userId
		this.addressService.addressListByUserId(+this.primaryContactId).subscribe(addressList => {
			if (addressList.length > 0) {
				this.homeAdd = _.find(addressList, { 'type': 'H' });
				this.workAdd = _.find(addressList, { 'type': 'W' });
			}
		});
	}

	openAddAddressDialog(addType: string) {

		this.isLoading = true;

		let config = new MdDialogConfig();
		config.disableClose = true;
		config.viewContainerRef = this.viewContainerRef;

		let addressData = { "mode": "add", "type": addType };
		config.data = addressData;

		this.dialogRef = this.dialog.open(AddressDialog, config);

		this.dialogRef.afterClosed().subscribe(address => {
			if (address !== undefined) {

				this.company.addresses.push(address);

				this.companyService.save(this.company).subscribe(savedCompany => {
					this.company = savedCompany;
				});

				if (address.type === 'H') {
					this.homeAdd = address;
				} else {
					this.workAdd = address;
				}
			}
			this.dialogRef = null;
			this.isLoading = false;
		});
	}

} 