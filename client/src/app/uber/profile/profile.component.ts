import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { CompanyDialog } from '../../shared/components/company/company-dialog';
import { Company } from '../../shared/components/company/company';
import { CompanyService } from '../../shared/components/company/company.service';
import { UserDialog } from '../../user/user-dialog';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
	providers: [CompanyService]
})
export class ProfileComponent implements OnInit {



	isLoading: boolean = false;
	dialogRef: MdDialogRef<CompanyDialog>;
	company: Company = null;
	private loggedInUser = sessionStorage.getItem("userId");

	constructor(public dialog: MdDialog, public viewContainerRef: ViewContainerRef, private companyService: CompanyService) { }

	ngOnInit() {
		this.companyService.findCompanyByUser(+this.loggedInUser).subscribe((company: Company) => {
			this.company = company;
		});
	}

	openAddCompanyDialog() {
		this.isLoading = true;

		let config = new MdDialogConfig();
		config.disableClose = true;
		config.viewContainerRef = this.viewContainerRef;
		let addressData = { "mode": "add", "type": "addType" };
		config.data = addressData;

		this.dialogRef = this.dialog.open(CompanyDialog, config);

		this.dialogRef.afterClosed().subscribe(company => {
			if (company !== undefined) {
				this.company = company;
			}
			this.dialogRef = null;
			this.isLoading = false;
		}, error => {
			console.log("Error after closing dialog");
		}, () => {
			// After adding company, attach current user in company's user list
			this.companyService.attachUserToCompany(+this.loggedInUser, this.company.id).subscribe(res => {
				console.info("User attached to company");
			});
		});
	}

}
