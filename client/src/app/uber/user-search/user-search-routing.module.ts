import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSearchComponent } from './user-search.component';
import { UserSearchListComponent } from './user-search-list.component';

const routes: Routes = [
	{ path: '', component: UserSearchComponent },
	{ path: 'list', component: UserSearchListComponent },

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserSearchRoutingModule { }

