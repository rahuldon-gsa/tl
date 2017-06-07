import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ShipmentListComponent} from './shipment-list.component';
import {ShipmentPersistComponent} from './shipment-persist.component';
import {ShipmentShowComponent} from './shipment-show.component';

const routes: Routes = [
  {path: 'shipment', redirectTo: 'shipment/list', pathMatch: 'full'},
  {path: 'shipment/list', component: ShipmentListComponent},
  {path: 'shipment/create', component: ShipmentPersistComponent},
  {path: 'shipment/edit/:id', component: ShipmentPersistComponent},
  {path: 'shipment/show/:id', component: ShipmentShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentRoutingModule {}