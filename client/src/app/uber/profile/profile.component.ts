import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { CompanyDialog } from '../../shared/components/company/company-dialog';
import { Company } from '../../shared/components/company/company';
import { CompanyService } from '../../shared/components/company/company.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
	providers: [CompanyService]
})
export class ProfileComponent implements OnInit {

	isLoading: boolean = false;
	dialogRef: MdDialogRef<CompanyDialog>;
	company: Company = null;

	constructor(public dialog: MdDialog, public viewContainerRef: ViewContainerRef, private companyService: CompanyService) { }

	ngOnInit() {

		this.companyService.findCompanyByUser(+sessionStorage.getItem("userId")).subscribe((company: Company) => {
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

		this.dialogRef.afterClosed().subscribe(address => {
			this.dialogRef = null;
			this.isLoading = false;
		});
	}

}
