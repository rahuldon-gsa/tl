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
import { ShipmentService } from './shipment.service';
import { PageHeaderModule } from '../../modules/page-header/page-header.module';
import { SmarttableModule } from '../../modules/smarttable/smarttable.module';
import { ShipmentRoutingModule } from './shipment-routing.module';
import { ShipmentComponent } from './shipment.component';
import { ShipmentDialog } from './shipment-dialog.component';
import { ShipmentListComponent } from './shipment-list.component';
import { LoadModule } from '../load/load.module';
import { ItemModule } from '../item/item.module';

@NgModule({
	declarations: [
		ShipmentComponent,
		ShipmentDialog,
		ShipmentListComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ShipmentRoutingModule,
		LoadModule, NgbModule.forRoot(),
		MaterialModule,
		PageHeaderModule,
		SmarttableModule.forRoot(),
		ItemModule
	],
	providers: [
		ShipmentService
	],
	entryComponents: [ShipmentDialog]
})
export class ShipmentModule { }