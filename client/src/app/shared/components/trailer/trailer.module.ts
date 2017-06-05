import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
	MaterialModule,
	OverlayContainer,
	FullscreenOverlayContainer,
	MdSelectionModule, MdButtonModule, MdCheckboxModule,
	MdNativeDateModule, MdDatepickerModule
} from '@angular/material';
import { TrailerService } from './trailer.service';
import { PageHeaderModule } from '../../modules/page-header/page-header.module';
import { SmarttableModule } from '../../modules/smarttable/smarttable.module';
import { TrailerRoutingModule } from './trailer-routing.module';
import { TrailerComponent } from './trailer.component';
import { TrailerDialog } from './trailer-dialog.component';
import { UserModule } from '../../../user/user.module';
import { CompanyService } from '../company/company.service';
import { AddressService } from '../address/address.service';
import { UserService } from '../../../user/user.service';

@NgModule({
	declarations: [
		TrailerComponent,
		TrailerDialog
	],
	imports: [
		CommonModule,
		FormsModule,
		TrailerRoutingModule,
		UserModule,
		NgbModule.forRoot(),
		MaterialModule,
		PageHeaderModule,
		SmarttableModule.forRoot()
	],
	providers: [
		TrailerService, CompanyService, AddressService, UserService
	],
	entryComponents: [TrailerDialog]
})
export class TrailerModule { }