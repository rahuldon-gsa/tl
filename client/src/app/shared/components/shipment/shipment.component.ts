import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShipmentService } from './shipment.service';
import { Shipment } from './shipment';
declare var google: any;

@Component({
	selector: 'shipment-list',
	templateUrl: './shipment.component.html',
	styleUrls: ['./../master.scss'],
	providers: [ShipmentService]
})
export class ShipmentComponent implements OnInit {

	shipment = new Shipment();
	headingVal: string;
	create = true;
	errors: any[];

	constructor(private route: ActivatedRoute, private shipmentService: ShipmentService, private router: Router) { }


	ngOnInit() {

		this.headingVal = 'Create Shipment';

		this.route.params.subscribe((params: Params) => {
			if (params.hasOwnProperty('id')) {
				this.shipmentService.get(+params['id']).subscribe((shipment: Shipment) => {
					this.create = false;
					this.shipment = shipment;
				});
			}
		});


		// Initialize the search box and autocomplete
		let searchBox: any = document.getElementById('autocomplete');
		let options = {
			types: ['geocode'],
			componentRestrictions: { country: 'us' }
		};
		var autocomplete = new google.maps.places.Autocomplete(searchBox, options);

		// Add listener to the place changed event
		autocomplete.addListener('place_changed', () => {
			let place = autocomplete.getPlace();
			let lat = place.geometry.location.lat();
			let lng = place.geometry.location.lng();
			let address = place.formatted_address;

			console.log(address);

			this.addAddress(lat, lng, address, 'source');
		});

	}

	addAddress(lat: number, lng: number, address: any, type: string) {

	}
}
