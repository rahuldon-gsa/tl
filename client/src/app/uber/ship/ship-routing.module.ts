import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipComponent } from './ship.component';
import { ShipDeactivateGuard } from './ship-can-deactivate-guard';

const routes: Routes = [
	{ path: '', component: ShipComponent, canDeactivate: [ShipDeactivateGuard] }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShipRoutingModule { }
