import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Company } from './company';
import { CompanyService } from './company.service';
import { Response } from "@angular/http";
import { AddressService } from '../address/address.service';
import { Address } from '../address/address';

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

	constructor(private route: ActivatedRoute, private companyService: CompanyService, private router: Router, private addressService: AddressService) { }

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

	save() {
		this.companyService.save(this.company).subscribe((company: Company) => {
			this.router.navigate(['/company', 'show', company.id]);
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
