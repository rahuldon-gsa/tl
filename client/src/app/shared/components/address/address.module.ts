import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
	MaterialModule,
	OverlayContainer,
	FullscreenOverlayContainer,
	MdSelectionModule, MdButtonModule, MdCheckboxModule
} from '@angular/material';
import { AddressDialog } from '../address/address-dialog';
import { AddressComponent } from '../address/address.component';
import { AddressService } from '../address/address.service';
import { SmarttableModule } from '../../modules/smarttable/smarttable.module';

@NgModule({
	declarations: [AddressComponent, AddressDialog],
	imports: [
		CommonModule,
		FormsModule,
		NgbModule.forRoot(),
		MaterialModule
	],
	providers: [AddressService]
})
export class AddressModule { }