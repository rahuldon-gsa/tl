import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {LoadListComponent} from './load-list.component';
import {LoadPersistComponent} from './load-persist.component';
import {LoadShowComponent} from './load-show.component';

const routes: Routes = [
  {path: 'load', redirectTo: 'load/list', pathMatch: 'full'},
  {path: 'load/list', component: LoadListComponent},
  {path: 'load/create', component: LoadPersistComponent},
  {path: 'load/edit/:id', component: LoadPersistComponent},
  {path: 'load/show/:id', component: LoadShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadRoutingModule {}