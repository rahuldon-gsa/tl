import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TruckComponent } from './truck.component';
import { TruckPersistComponent } from './truck-persist.component';
import { TruckShowComponent } from './truck-show.component';

const routes: Routes = [
	{ path: '', redirectTo: 'truck/list', pathMatch: 'full' },
	{ path: 'truck/list', component: TruckComponent },
	{ path: 'truck/create', component: TruckPersistComponent },
	{ path: 'truck/edit/:id', component: TruckPersistComponent },
	{ path: 'truck/show/:id', component: TruckShowComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TruckRoutingModule { }