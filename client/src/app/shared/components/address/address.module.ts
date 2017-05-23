import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AddressService} from './address.service';


import {AddressRoutingModule} from './address-routing.module';
import {AddressShowComponent} from './address-show.component';
import {AddressListComponent} from './address-list.component';
import {AddressPersistComponent} from './address-persist.component'; 

@NgModule({
  declarations: [
    AddressListComponent,
    AddressPersistComponent,
    AddressShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AddressRoutingModule
  ],
  providers: [
    AddressService
  ]
})
export class AddressModule {}