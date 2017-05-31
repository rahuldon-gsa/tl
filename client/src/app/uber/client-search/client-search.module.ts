import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
	MaterialModule,
	OverlayContainer,
	FullscreenOverlayContainer,
	MdSelectionModule, MdButtonModule, MdCheckboxModule
} from '@angular/material';
import { SmarttableModule } from '../../shared/modules/smarttable/smarttable.module';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { ClientSearchComponent } from './client-search.component';
import { ClientSearchRoutingModule } from './client-search-routing.module';
import { ClientModule } from '../../shared/components/client/client.module';
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NgbModule.forRoot(),
		MaterialModule,
		PageHeaderModule,
		SmarttableModule.forRoot(),
		ClientSearchRoutingModule,
		ClientModule
	],
	declarations: [ClientSearchComponent]
})
export class ClientSearchModule { }
