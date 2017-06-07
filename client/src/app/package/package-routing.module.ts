import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {PackageListComponent} from './package-list.component';
import {PackagePersistComponent} from './package-persist.component';
import {PackageShowComponent} from './package-show.component';

const routes: Routes = [
  {path: 'package', redirectTo: 'package/list', pathMatch: 'full'},
  {path: 'package/list', component: PackageListComponent},
  {path: 'package/create', component: PackagePersistComponent},
  {path: 'package/edit/:id', component: PackagePersistComponent},
  {path: 'package/show/:id', component: PackageShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageRoutingModule {}