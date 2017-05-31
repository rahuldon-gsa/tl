import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ClientUserListComponent} from './clientUser-list.component';
import {ClientUserPersistComponent} from './clientUser-persist.component';
import {ClientUserShowComponent} from './clientUser-show.component';

const routes: Routes = [
  {path: 'clientUser', redirectTo: 'clientUser/list', pathMatch: 'full'},
  {path: 'clientUser/list', component: ClientUserListComponent},
  {path: 'clientUser/create', component: ClientUserPersistComponent},
  {path: 'clientUser/edit/:id', component: ClientUserPersistComponent},
  {path: 'clientUser/show/:id', component: ClientUserShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientUserRoutingModule {}