import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentListComponent } from './shipment-list.component';
import { ShipmentComponent } from './shipment.component';

const routes: Routes = [
	{ path: '', redirectTo: 'shipment/list', pathMatch: 'full' },
	{ path: 'shipment/list', component: ShipmentListComponent },
	{ path: 'shipment/create', component: ShipmentComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShipmentRoutingModule { }