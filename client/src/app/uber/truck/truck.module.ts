import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {TruckService} from './truck.service';


import {TruckRoutingModule} from './truck-routing.module';
import {TruckShowComponent} from './truck-show.component';
import {TruckListComponent} from './truck-list.component';
import {TruckPersistComponent} from './truck-persist.component';
import { UserModule } from '../user/user.module';
import { AddressModule } from '../address/address.module';

@NgModule({
  declarations: [
    TruckListComponent,
    TruckPersistComponent,
    TruckShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TruckRoutingModule,
    UserModule,
    AddressModule
],
  providers: [
    TruckService
  ]
})
export class TruckModule {}