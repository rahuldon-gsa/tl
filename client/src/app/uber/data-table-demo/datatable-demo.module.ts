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
import { DataTableDemoRoutingModule } from './data-table-routing.module';
import { DataTableDemo } from './data-table-demo';
import { DataTableHeader } from './data-table-header';
import { PaginationControl } from './pagination-control';
import { DataTableModule } from '../data-table/data-table.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NgbModule.forRoot(),
		MaterialModule,
		SmarttableModule.forRoot(),
		PageHeaderModule,
		DataTableDemoRoutingModule,
		DataTableModule
	], declarations: [DataTableDemo, DataTableHeader, PaginationControl]
})
export class DataTableDemoModule { }
