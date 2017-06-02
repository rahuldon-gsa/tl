import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientService } from './client.service';
import { ClientRoutingModule } from './client-routing.module';
import { ClientShowComponent } from './client-show.component';
import { ClientListComponent } from './client-list.component';
import { ClientPersistComponent } from './client-persist.component';
import { UserModule } from '../../../user/user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
	MaterialModule,
	OverlayContainer,
	FullscreenOverlayContainer,
	MdSelectionModule, MdButtonModule, MdCheckboxModule
} from '@angular/material';
import { PageHeaderModule } from '../../modules/page-header/page-header.module';
import { CompanyService } from '../company/company.service';
import { AddressDialog } from '../address/address-dialog';
import { ClientUserDialog } from '../clientUser/clientUser-dialog';
import { SmarttableModule } from '../../modules/smarttable/smarttable.module';

@NgModule({
	declarations: [
		ClientListComponent,
		ClientPersistComponent,
		ClientShowComponent, AddressDialog, ClientUserDialog
	],
	imports: [
		CommonModule,
		FormsModule,
		ClientRoutingModule,
		NgbModule.forRoot(),
		MaterialModule,
		UserModule,
		PageHeaderModule,
		SmarttableModule.forRoot()
	],
	providers: [
		ClientService, CompanyService
	], entryComponents: [AddressDialog, ClientUserDialog]
})
export class ClientModule { }