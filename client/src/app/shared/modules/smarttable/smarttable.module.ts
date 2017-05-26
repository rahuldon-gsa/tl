import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@angular/material";

import {
	SmdBottomNavLabelDirective,
	SmdBottomNavGroupComponent,
	SmdBottomNavComponent
} from "./smd-bottom-nav";

import {
	SmdDataTable,
	SmdDatatableHeader,
	SmdDatatableActionButton,
	SmdContextualDatatableButton,
	SmdDataTableColumnComponent,
	SmdDataTableRowComponent,
	SmdDataTableCellComponent,
	SmdDatatableDialogChangeValue
} from "./smd-datatable";

import {
	SmdErrorMessageComponent,
	SmdErrorMessagesComponent
} from "./smd-error-messages";

import {
	SmdFabSpeedDialTrigger,
	SmdFabSpeedDialActions,
	SmdFabSpeedDialComponent
} from "./smd-fab-speed-dial";

import {
	SmdPaginatorComponent
} from "./smd-paginator";

let COMPONENTS = [
	SmdDataTable,
	SmdDatatableHeader,
	SmdDatatableActionButton,
	SmdContextualDatatableButton,
	SmdDataTableColumnComponent,
	SmdDataTableRowComponent,
	SmdDataTableCellComponent,
	SmdDatatableDialogChangeValue,
	SmdPaginatorComponent,
	SmdFabSpeedDialTrigger,
	SmdFabSpeedDialActions,
	SmdFabSpeedDialComponent,
	SmdBottomNavLabelDirective,
	SmdBottomNavGroupComponent,
	SmdBottomNavComponent,
	SmdErrorMessageComponent,
	SmdErrorMessagesComponent
];

let IMPORTS = [
	CommonModule,
	HttpModule,
	FormsModule,
	ReactiveFormsModule,
	MaterialModule
];

@NgModule({
	imports: IMPORTS,
	declarations: COMPONENTS,
	exports: COMPONENTS,
	providers: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	entryComponents: [SmdDatatableDialogChangeValue]
})
export class SmarttableModule {

	static forRoot(...imports: any[]): any[] {
		return [
			CommonModule,
			HttpModule,
			FormsModule,
			ReactiveFormsModule,
			MaterialModule,
			SmarttableModule,
			...imports
		]
	}

}