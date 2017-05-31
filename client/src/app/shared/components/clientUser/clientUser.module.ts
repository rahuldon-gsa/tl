import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {ClientUserService} from './clientUser.service';


import {ClientUserRoutingModule} from './clientUser-routing.module';
import {ClientUserShowComponent} from './clientUser-show.component';
import {ClientUserListComponent} from './clientUser-list.component';
import {ClientUserPersistComponent} from './clientUser-persist.component';

@NgModule({
  declarations: [
    ClientUserListComponent,
    ClientUserPersistComponent,
    ClientUserShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClientUserRoutingModule
  ],
  providers: [
    ClientUserService
  ]
})
export class ClientUserModule {}