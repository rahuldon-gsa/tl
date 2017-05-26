import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompanyService } from './company.service';
import { CompanyRoutingModule } from './company-routing.module';
import { ClientModule } from '../client/client.module';

@NgModule({
	declarations: [
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