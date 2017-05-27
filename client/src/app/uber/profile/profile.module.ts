import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
	MaterialModule,
	OverlayContainer,
	FullscreenOverlayContainer,
	MdSelectionModule, MdButtonModule, MdCheckboxModule
} from '@angular/material';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { CompanyDialog } from '../../shared/components/company/company-dialog';
import { CompanyComponent } from '../../shared/components/company/company.component';
import { UserDialog } from '../../user/user-dialog';
import { SmarttableModule } from '../../shared/modules/smarttable/smarttable.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ProfileRoutingModule,
		NgbModule.forRoot(),
		MaterialModule,
		PageHeaderModule,
		SmarttableModule.forRoot()
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [ProfileComponent, CompanyDialog, CompanyComponent, UserDialog],
	entryComponents: [CompanyDialog, UserDialog]
})
export class ProfileModule { }
