import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
	MaterialModule,
	OverlayContainer,
	FullscreenOverlayContainer,
	MdSelectionModule, MdButtonModule, MdCheckboxModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { ShipRoutingModule } from './ship-routing.module';
import { ShipComponent } from './ship.component';
import { SmarttableModule } from '../../shared/modules/smarttable/smarttable.module';
import { ShipDeactivateGuard } from './ship-can-deactivate-guard';
import { ShipmentListComponent } from './ship-list.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NgbModule.forRoot(),
		MaterialModule,
		ShipRoutingModule,
		SmarttableModule.forRoot(),
		PageHeaderModule
	],
	declarations: [ShipComponent, ShipmentListComponent],
	providers: [ShipDeactivateGuard]
})
export class ShipModule { }
