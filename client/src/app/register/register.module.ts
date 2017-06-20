import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	MaterialModule,
	OverlayContainer,
	FullscreenOverlayContainer,
	MdSelectionModule, MdButtonModule, MdCheckboxModule
} from '@angular/material';
import { RegisterService } from './register.service';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPersistComponent } from './register-persist.component';

@NgModule({
	declarations: [
		RegisterPersistComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		RegisterRoutingModule,
		NgbModule.forRoot(),
		BrowserAnimationsModule,
		MaterialModule
	],
	providers: [
		RegisterService
	]
})
export class RegisterModule { }