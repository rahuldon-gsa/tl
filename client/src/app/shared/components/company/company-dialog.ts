import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Company } from './company';
import { CompanyService } from './company.service';
import { Response } from "@angular/http";
import { AddressService } from '../address/address.service';
import { Address } from '../address/address';
import * as _ from "lodash";
declare var System: any;

@Component({
	selector: 'company-dialog',
	templateUrl: './company-dialog.html',
	styleUrls: ['./company-card.scss'],
	providers: [CompanyService, AddressService]
})
export class CompanyDialog implements OnInit {

	company = new Company();
	create = true;
	errors: any[];
	addressList: Address[];
	stateList = [];
	companyTypes = [
		{ code: 'LLC', description: 'Limited Liability Company' },
		{ code: 'SCORP', description: 'S Corporation' },
		{ code: 'CCORP', description: 'C Corporation' },
		{ code: 'LLP', description: 'Limited Liability Partnership' },
		{ code: 'OTHER', description: 'Other' }
	];

	constructor( @Inject(MD_DIALOG_DATA) data: any, public dialogRef: MdDialogRef<CompanyDialog>, private route: ActivatedRoute, private companyService: CompanyService, private router: Router, private addressService: AddressService) {
		System.import('../../data/states.json').then(file => {
			this.stateList = _.toArray(file);
		});
		if (data !== undefined && data.mode === 'add') {
		} else {
			this.companyService.get(data.id).subscribe((company: Company) => {
				this.create = false;
				this.company = company;
			});
		}
	}

	ngOnInit() {

	}

	saveCompany() {

		const loggedInUser = sessionStorage.getItem("userId");
		if (!this.company.id) {
			this.company.createdBy = loggedInUser;
			this.company.status = "INITIAL";
			this.company.updatedBy = loggedInUser;
		} else {
			this.company.updatedBy = loggedInUser;
		}

		this.companyService.save(this.company).subscribe((company: Company) => {
			this.dialogRef.close(company);
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
