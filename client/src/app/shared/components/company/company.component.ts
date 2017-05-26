import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Company } from './company';
import { CompanyService } from './company.service';
import { Response } from "@angular/http";
import { AddressService } from '../address/address.service';
import { Address } from '../address/address';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { CompanyDialog } from './company-dialog';

@Component({
	selector: 'company-card',
	templateUrl: './company.component.html',
	styleUrls: ['./company-card.scss'],
	providers: [AddressService, CompanyService]
})
export class CompanyComponent implements OnInit {

	@Input() companyId: string;
	company = new Company();
	create = true;
	errors: any[];
	addressList: Address[];
	dialogRef: MdDialogRef<CompanyDialog>;

	isLoading: boolean = false;

	constructor(private route: ActivatedRoute, private companyService: CompanyService, private router: Router, private addressService: AddressService, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) { }

	ngOnInit() {
		if (this.companyId !== undefined) {
			this.companyService.get(+this.companyId).subscribe(
				data => {
					this.create = false;
					this.company = data;
				},
				error => {
					console.log("Error Getting Company :: " + error);
				});
		}

		/*
		this.addressService.list().subscribe((addressList: Address[]) => { this.addressList = addressList; });
		this.route.params.subscribe((params: Params) => {
			if (params.hasOwnProperty('id')) {
				this.companyService.get(+params['id']).subscribe((company: Company) => {
					this.create = false;
					this.company = company;
				});
			}
		});
		*/
	}

	editCompany(companyId: number) {
		this.isLoading = true;

		let config = new MdDialogConfig();
		config.disableClose = true;
		config.viewContainerRef = this.viewContainerRef;

		let addressData = { "mode": "edit", "id": companyId };
		config.data = addressData;

		this.dialogRef = this.dialog.open(CompanyDialog, config);

		this.dialogRef.afterClosed().subscribe(company => {
			if (company !== undefined) {
				this.company = company;
				this.dialogRef = null;
			}
			this.isLoading = false;

		});
	}


}
