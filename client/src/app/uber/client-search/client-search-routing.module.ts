import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientSearchComponent } from './client-search.component';

const routes: Routes = [
	{ path: '', component: ClientSearchComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ClientSearchRoutingModule { }
