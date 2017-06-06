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
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { UserSearchPipe } from './user-search.pipe';
import { UserDialog } from '../../user/user-dialog';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		UserSearchRoutingModule,
		NgbModule.forRoot(),
		MaterialModule,
		SmarttableModule.forRoot(),
		PageHeaderModule
	], declarations: [UserDialog, UserSearchComponent, UserSearchPipe],
	entryComponents: [UserDialog]
})
export class UserSearchModule { }
