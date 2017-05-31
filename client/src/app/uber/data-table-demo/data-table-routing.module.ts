import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataTableDemo } from './data-table-demo';
import { DataTableHeader } from './data-table-header';
import { PaginationControl } from './pagination-control';

const routes: Routes = [
	{ path: '', component: DataTableDemo }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DataTableDemoRoutingModule { }

