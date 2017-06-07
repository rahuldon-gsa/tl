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
import { PageHeaderModule } from '../../modules/page-header/page-header.module';
import { SmarttableModule } from '../../modules/smarttable/smarttable.module';
import { ItemService } from './item.service';
import { ItemRoutingModule } from './item-routing.module';

import { ItemShowComponent } from './item-show.component';
import { ItemListComponent } from './item-list.component';
import { ItemPersistComponent } from './item-persist.component';

@NgModule({
	declarations: [
		ItemListComponent,
		ItemPersistComponent,
		ItemShowComponent
	],
	imports: [
		ItemRoutingModule,
		CommonModule,
		FormsModule,
		NgbModule.forRoot(),
		MaterialModule,
		PageHeaderModule,
		SmarttableModule.forRoot()
	],
	providers: [
		ItemService
	]
})
export class ItemModule { }