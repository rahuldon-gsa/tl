import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {AddressListComponent} from './address-list.component';
import {AddressPersistComponent} from './address-persist.component';
import {AddressShowComponent} from './address-show.component';

const routes: Routes = [
  {path: 'address', redirectTo: 'address/list', pathMatch: 'full'},
  {path: 'address/list', component: AddressListComponent},
  {path: 'address/create', component: AddressPersistComponent},
  {path: 'address/edit/:id', component: AddressPersistComponent},
  {path: 'address/show/:id', component: AddressShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule {}