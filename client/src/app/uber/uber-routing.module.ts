import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UberComponent } from './uber.component';
import { AuthGuard } from './../shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '', component: UberComponent, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'forms', loadChildren: './form/form.module#FormModule' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class UberRoutingModule { }
