import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {LoadService} from './load.service';


import {LoadRoutingModule} from './load-routing.module';
import {LoadShowComponent} from './load-show.component';
import {LoadListComponent} from './load-list.component';
import {LoadPersistComponent} from './load-persist.component';
import { LocationModule } from '../location/location.module';
import { ItemModule } from '../item/item.module';

@NgModule({
  declarations: [
    LoadListComponent,
    LoadPersistComponent,
    LoadShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoadRoutingModule,
    LocationModule,
    ItemModule
],
  providers: [
    LoadService
  ]
})
export class LoadModule {}