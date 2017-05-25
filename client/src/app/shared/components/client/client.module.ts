import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientService } from './client.service';
import { ClientRoutingModule } from './client-routing.module';
import { ClientShowComponent } from './client-show.component';
import { ClientListComponent } from './client-list.component';
import { ClientPersistComponent } from './client-persist.component';
import { UserModule } from '../../../user/user.module';
import { CompanyModule } from '../company/company.module';

@NgModule({
	declarations: [
		ClientListComponent,
		ClientPersistComponent,
		ClientShowComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ClientRoutingModule,
		UserModule,
		CompanyModule
	],
	providers: [
		ClientService
	]
})
export class ClientModule { }