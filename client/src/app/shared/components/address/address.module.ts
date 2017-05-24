import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddressService } from './address.service';

@NgModule({
	declarations: [
	],
	imports: [
		CommonModule,
		FormsModule
	],
	providers: [
		AddressService
	]
})
export class AddressModule { }