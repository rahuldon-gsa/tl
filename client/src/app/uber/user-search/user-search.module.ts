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
import { UserSearchComponent } from './user-search.component';
import { UserSearchRoutingModule } from './user-search-routing.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		UserSearchRoutingModule,
		NgbModule.forRoot(),
		MaterialModule,
		SmarttableModule.forRoot()
	], declarations: [UserSearchComponent]
})
export class UserSearchModule { }
