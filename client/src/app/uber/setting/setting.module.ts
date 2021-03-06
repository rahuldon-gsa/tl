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
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { ContactComponent } from '../../shared/components/contact/contact.component';
import { AddressComponent } from '../../shared/components/address/address.component';
import { AddressDialog } from '../../shared/components/address/address-dialog';
import { ContactDialog } from '../../shared/components/contact/contact-dialog';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SettingRoutingModule,
		NgbModule.forRoot(),
		MaterialModule,
		PageHeaderModule
	],
	declarations: [SettingComponent, ContactComponent, AddressComponent, AddressDialog, ContactDialog],
	entryComponents: [AddressDialog, ContactDialog]
})
export class SettingModule { }
