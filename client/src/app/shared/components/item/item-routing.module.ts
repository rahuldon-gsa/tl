import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './item.component'; 

const routes: Routes = [
	{ path: '', redirectTo: 'item/list', pathMatch: 'full' },
	{ path: 'item/list', component: ItemComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ItemRoutingModule { }