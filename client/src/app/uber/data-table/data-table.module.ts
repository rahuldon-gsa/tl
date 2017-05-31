import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
	MaterialModule,
	OverlayContainer,
	FullscreenOverlayContainer,
	MdSelectionModule, MdButtonModule, MdCheckboxModule
} from '@angular/material';
import {
	MdCell,
	MdHeaderCell,
	MdRow,
	MdHeaderRowPlaceholder,
	MdRowPlaceholder,
	MdColumnDef,
	MdHeaderCellDef,
	MdCellOutlet,
	MdCellDef,
	MdRowDef,
	MdTable,
} from './data-table';
import { MdSortable } from './sortable';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NgbModule.forRoot(),
		MaterialModule
	], exports: [
		MdTable, MdRowDef, MdCellDef, MdCellOutlet, MdHeaderCellDef,
		MdColumnDef, MdCell, MdRow, MdHeaderCell, MdSortable],
	declarations: [
		MdTable, MdRowDef, MdCellDef, MdCellOutlet, MdHeaderCellDef,
		MdColumnDef, MdCell, MdRow, MdHeaderCell, MdSortable,
		MdRowPlaceholder, MdHeaderRowPlaceholder,
	]
})
export class DataTableModule { }