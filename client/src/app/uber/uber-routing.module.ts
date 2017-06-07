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
			{ path: 'clients', loadChildren: './client-search/client-search.module#ClientSearchModule', canActivate: [AuthGuard] },
			{ path: 'client', loadChildren: './../shared/components/client/client.module#ClientModule', canActivate: [AuthGuard] },
			{ path: 'truck', loadChildren: './../shared/components/truck/truck.module#TruckModule', canActivate: [AuthGuard] },
			{ path: 'trailer', loadChildren: './../shared/components/trailer/trailer.module#TrailerModule', canActivate: [AuthGuard] },
			{ path: 'item', loadChildren: './../shared/components/item/item.module#ItemModule', canActivate: [AuthGuard] },
			{ path: 'ship', loadChildren: './../shared/components/shipment/shipment.module#ShipmentModule', canActivate: [AuthGuard] }
		]
	}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [AuthGuard]
})
export class UberRoutingModule { }
