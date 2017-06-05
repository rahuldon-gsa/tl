import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrailerComponent } from './trailer.component';

const routes: Routes = [
	{ path: '', redirectTo: 'trailer/list', pathMatch: 'full' },
	{ path: 'trailer/list', component: TrailerComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TrailerRoutingModule { }