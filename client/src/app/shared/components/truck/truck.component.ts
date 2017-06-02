import { Component, OnInit } from '@angular/core';
import { TruckService } from './truck.service';
import { Truck } from './truck';

@Component({
	selector: 'truck-list',
	templateUrl: './truck.component.html'
})
export class TruckComponent implements OnInit {

	truckList: Truck[] = [];
	isLoading: boolean = false;
	private loggedInUser = sessionStorage.getItem("userId");
	private companyId = sessionStorage.getItem("companyId");

	constructor(private truckService: TruckService) { }

	ngOnInit() {
		this.truckService.findAllByCompanyId(+this.companyId).subscribe((truckList: Truck[]) => {
			this.truckList = truckList;
		});
	}
}
