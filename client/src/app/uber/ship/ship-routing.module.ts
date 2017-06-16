import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipComponent } from './ship.component';
import { ShipmentListComponent } from './ship-list.component';
import { ShipDeactivateGuard } from './ship-can-deactivate-guard';

const routes: Routes = [
	{ path: '', redirectTo: 'list', pathMatch: 'full' },
	{ path: 'create', component: ShipComponent, canDeactivate: [ShipDeactivateGuard] },
	{ path: 'edit/:id', component: ShipComponent, canDeactivate: [ShipDeactivateGuard] },
	{ path: 'list', component: ShipmentListComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShipRoutingModule { }
