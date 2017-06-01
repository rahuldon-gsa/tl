import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {TrailerService} from './trailer.service';


import {TrailerRoutingModule} from './trailer-routing.module';
import {TrailerShowComponent} from './trailer-show.component';
import {TrailerListComponent} from './trailer-list.component';
import {TrailerPersistComponent} from './trailer-persist.component';
import { UserModule } from '../user/user.module';
import { AddressModule } from '../address/address.module';

@NgModule({
  declarations: [
    TrailerListComponent,
    TrailerPersistComponent,
    TrailerShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TrailerRoutingModule,
    UserModule,
    AddressModule
],
  providers: [
    TrailerService
  ]
})
export class TrailerModule {}