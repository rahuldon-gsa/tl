import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompanyService } from './company.service';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyShowComponent } from './company-show.component';
import { CompanyListComponent } from './company-list.component';
import { CompanyPersistComponent } from './company-persist.component';
import { ClientModule } from '../client/client.module';

@NgModule({
	declarations: [
		CompanyListComponent,
		CompanyPersistComponent,
		CompanyShowComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		CompanyRoutingModule,
		ClientModule
	],
	providers: [
		CompanyService
	]
})
export class CompanyModule { }