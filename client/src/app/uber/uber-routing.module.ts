import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UberComponent } from './uber.component';

const routes: Routes = [
  {
    path: '', component: UberComponent,
    children: [
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UberRoutingModule { }
