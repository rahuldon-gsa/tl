import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Shipment } from './shipment';
import { ShipmentService } from './shipment.service';
import { Response } from "@angular/http";
import { LoadService } from '../load/load.service';
import { Load } from '../load/load';

@Component({
	selector: 'shipment-dialog',
	templateUrl: './shipment-dialog.component.html'
})
export class ShipmentDialog implements OnInit {

	shipment = new Shipment();
	create = true;
	errors: any[];
	loadList: Load[];

	constructor(private route: ActivatedRoute, private shipmentService: ShipmentService, private router: Router, private loadService: LoadService) { }

	ngOnInit() {
		this.loadService.list().subscribe((loadList: Load[]) => { this.loadList = loadList; });
		this.route.params.subscribe((params: Params) => {
			if (params.hasOwnProperty('id')) {
				this.shipmentService.get(+params['id']).subscribe((shipment: Shipment) => {
					this.create = false;
					this.shipment = shipment;
				});
			}
		});
	}

	save() {
		this.shipmentService.save(this.shipment).subscribe((shipment: Shipment) => {
			this.router.navigate(['/shipment', 'show', shipment.id]);
		}, (res: Response) => {
			const json = res.json();
			if (json.hasOwnProperty('message')) {
				this.errors = [json];
			} else {
				this.errors = json._embedded.errors;
			}
		});
	}
}
