import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
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

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ProfileRoutingModule,
		NgbModule.forRoot(),
		MaterialModule,
		PageHeaderModule
	],
	declarations: [ProfileComponent, CompanyDialog, CompanyComponent],
	entryComponents: [CompanyDialog]
})
export class ProfileModule { }
