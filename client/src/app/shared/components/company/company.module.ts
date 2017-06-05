import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompanyService } from './company.service';
import { CompanyRoutingModule } from './company-routing.module';
import { ClientModule } from '../client/client.module';
import { AddressService } from '../address/address.service';
import { UserService } from '../../../user/user.service';
import { SmarttableModule } from '../../modules/smarttable/smarttable.module';

@NgModule({
	declarations: [
	],
	imports: [
		CommonModule,
		FormsModule,
		CompanyRoutingModule,
		ClientModule,
		SmarttableModule
	],
	providers: [
		CompanyService, AddressService, UserService
	]
})
export class CompanyModule { }