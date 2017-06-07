import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {ItemService} from './item.service';


import {ItemRoutingModule} from './item-routing.module';
import {ItemShowComponent} from './item-show.component';
import {ItemListComponent} from './item-list.component';
import {ItemPersistComponent} from './item-persist.component';

@NgModule({
  declarations: [
    ItemListComponent,
    ItemPersistComponent,
    ItemShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ItemRoutingModule
  ],
  providers: [
    ItemService
  ]
})
export class ItemModule {}