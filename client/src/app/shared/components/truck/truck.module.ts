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
import { TruckService } from './truck.service';
import { PageHeaderModule } from '../../modules/page-header/page-header.module';
import { TruckRoutingModule } from './truck-routing.module';
import { TruckShowComponent } from './truck-show.component';
import { TruckComponent } from './truck.component';
import { UserModule } from '../../../user/user.module';
import { SmarttableModule } from '../../modules/smarttable/smarttable.module';
import { TruckDialog } from './truck-dialog.component';
import { CompanyService } from '../company/company.service';
import { AddressService } from '../address/address.service';
import { UserService } from '../../../user/user.service';

@NgModule({
	declarations: [
		TruckComponent,
		TruckShowComponent,
		TruckDialog
	],
	imports: [
		CommonModule,
		FormsModule,
		TruckRoutingModule,
		UserModule,
		NgbModule.forRoot(),
		MaterialModule,
		PageHeaderModule,
		SmarttableModule.forRoot()
	],
	providers: [
		TruckService, CompanyService, AddressService, UserService
	],
	entryComponents: [TruckDialog]
})
export class TruckModule { }