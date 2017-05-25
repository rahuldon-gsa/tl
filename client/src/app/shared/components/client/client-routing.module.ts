import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ClientListComponent} from './client-list.component';
import {ClientPersistComponent} from './client-persist.component';
import {ClientShowComponent} from './client-show.component';

const routes: Routes = [
  {path: 'client', redirectTo: 'client/list', pathMatch: 'full'},
  {path: 'client/list', component: ClientListComponent},
  {path: 'client/create', component: ClientPersistComponent},
  {path: 'client/edit/:id', component: ClientPersistComponent},
  {path: 'client/show/:id', component: ClientShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}