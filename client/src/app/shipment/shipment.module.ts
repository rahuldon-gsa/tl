import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {ShipmentService} from './shipment.service';


import {ShipmentRoutingModule} from './shipment-routing.module';
import {ShipmentShowComponent} from './shipment-show.component';
import {ShipmentListComponent} from './shipment-list.component';
import {ShipmentPersistComponent} from './shipment-persist.component';

@NgModule({
  declarations: [
    ShipmentListComponent,
    ShipmentPersistComponent,
    ShipmentShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShipmentRoutingModule
  ],
  providers: [
    ShipmentService
  ]
})
export class ShipmentModule {}