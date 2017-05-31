import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UberComponent } from './uber.component';
import { AuthGuard } from './../shared/guard/auth.guard';


const routes: Routes = [
	{
		path: '', component: UberComponent, canActivate: [AuthGuard],
		children: [
			{ path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
			{ path: 'forms', loadChildren: './form/form.module#FormModule', canActivate: [AuthGuard] },
			{ path: 'setting', loadChildren: './setting/setting.module#SettingModule', canActivate: [AuthGuard] },
			{ path: 'profile', loadChildren: './profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
			{ path: 'userSearch', loadChildren: './user-search/user-search.module#UserSearchModule', canActivate: [AuthGuard] },
			{ path: 'datatable', loadChildren: './data-table-demo/datatable-demo.module#DataTableDemoModule', canActivate: [AuthGuard] },
			{ path: 'user', loadChildren: '../user/user.module#UserModule', canActivate: [AuthGuard] },
			{ path: 'clients', loadChildren: './client-search/client-search.module#ClientSearchModule', canActivate: [AuthGuard] },
			{ path: 'client', loadChildren: './../shared/components/client/client.module#ClientModule', canActivate: [AuthGuard] }
		]
	}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [AuthGuard]
})
export class UberRoutingModule { }
