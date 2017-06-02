import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrailerListComponent } from './trailer-list.component';
import { TrailerPersistComponent } from './trailer-persist.component';
import { TrailerShowComponent } from './trailer-show.component';

const routes: Routes = [
	{ path: '', redirectTo: 'trailer/list', pathMatch: 'full' },
	{ path: 'trailer/list', component: TrailerListComponent },
	{ path: 'trailer/create', component: TrailerPersistComponent },
	{ path: 'trailer/edit/:id', component: TrailerPersistComponent },
	{ path: 'trailer/show/:id', component: TrailerShowComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TrailerRoutingModule { }