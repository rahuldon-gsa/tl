import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentListComponent } from './shipment-list.component';
import { ShipmentComponent } from './shipment.component';
import { ShipmentMasterComponent } from './shipment-master.component';

const routes: Routes = [
	{ path: '', redirectTo: 'shipment/list', pathMatch: 'full' },
	{ path: 'shipment/list', component: ShipmentListComponent },
	{
		path: 'shipment/master/:shipId', component: ShipmentMasterComponent, children: [
			{ path: '', component: ShipmentComponent },
			{ path: 'load', component: ShipmentComponent },
			{ path: 'item', component: ShipmentComponent }
		]
	},
	{ path: 'shipment/create', component: ShipmentComponent },
	{ path: 'shipment/edit/:id', component: ShipmentComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShipmentRoutingModule { }