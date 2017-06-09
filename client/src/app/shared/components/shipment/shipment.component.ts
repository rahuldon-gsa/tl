import { Component, OnInit, ViewContainerRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { ShipmentService } from './shipment.service';
import { Shipment } from './shipment';
import { Load } from '../load/load';
import { Location } from '../location/location';
import { LocationService } from '../location/location.service';
import { ItemDialog } from '../item/item-dialog.component';
import { Item } from '../item/item';
import { ConfirmationDialog } from '../confirmation/confirmation.component';
import { Response } from "@angular/http";
declare var google: any;

@Component({
	selector: 'shipment-list',
	templateUrl: './shipment.component.html',
	styleUrls: ['./../master.scss'],
	providers: [ShipmentService, LocationService]
})
export class ShipmentComponent implements OnInit {

	shipment = new Shipment();
	headingVal: string;
	create = true;
	errors: any[];
	fromAutocompleteError: boolean = false;
	locationArrangementTypes = this.shipmentService.locationArrangementTypes;
	pickUpTimeList = this.shipmentService.pickUpTimeList;
	isLoading: boolean = false;
	confirmationDialogRef: MdDialogRef<ConfirmationDialog>;
	itemDialogRef: MdDialogRef<ItemDialog>;


	constructor(private route: ActivatedRoute, private shipmentService: ShipmentService, private router: Router,
		public dialog: MdDialog, public viewContainerRef: ViewContainerRef, private locationService: LocationService) { }

	ngOnInit() {

		this.headingVal = 'Create Shipment';

		this.route.params.subscribe((params: Params) => {
			if (params.hasOwnProperty('id')) {
				this.shipmentService.get(+params['id']).subscribe((shipment: Shipment) => {
					this.create = false;
					this.shipment = shipment;
					this.headingVal = 'Edit Shipment';
				});
			}
		});

		if (this.create) {
			this.shipment.load = new Load();
			this.shipment.load.source = new Location();
			this.shipment.load.destination = new Location();
			this.shipment.load.items = [];
		}

		// Initialize the search box and autocomplete
		let fromSearchBox: any = document.getElementById('fromAutocomplete');
		let options = {
			types: ['geocode'],
			componentRestrictions: { country: 'us' }
		};
		var autocomplete = new google.maps.places.Autocomplete(fromSearchBox, options);

		// Add listener to the place changed event
		autocomplete.addListener('place_changed', () => {
			this.fromAutocompleteError = false;
			let place = autocomplete.getPlace();
			let address: string = place.formatted_address;

			let addList = address.split(',');
			if (addList.length < 4) {
				this.fromAutocompleteError = true;
			} else {
				this.addAddress(place.geometry.location.lat(), place.geometry.location.lng(), address, 'source');
			}
		});

		let toSearchBox: any = document.getElementById('toAutocomplete');
		var toAutocomplete = new google.maps.places.Autocomplete(toSearchBox, options);

		// Add listener to the place changed event
		toAutocomplete.addListener('place_changed', () => {
			this.fromAutocompleteError = false;
			let place = toAutocomplete.getPlace();
			let address: string = place.formatted_address;
			let addList = address.split(',');
			if (addList.length < 4) {
				this.fromAutocompleteError = true;
			} else {
				this.addAddress(place.geometry.location.lat(), place.geometry.location.lng(), address, 'destination');
			}
		});

	}

	addAddress(lat: number, lng: number, address: any, type: string) {
		let addList = address.split(',');
		let location: Location = new Location();
		location.address1 = addList[0].trim();
		location.city = addList[1].trim();

		let stateZip = addList[2].trim().split(' ');
		location.state = stateZip[0].trim();
		location.zipCode = stateZip[1].trim();
		location.country = addList[3].trim();

		if (type === 'source') {
			this.shipment.load.source = location;
		} else {
			this.shipment.load.destination = location;
		}
	}

	saveSourceLocation() {
		this.addLocation(this.shipment.load.source, 'source');
	}

	addLocation(location: Location, locationType?: string) {
		location.locationId = location.name;
		this.locationService.save(location).subscribe((locationDb: Location) => {
			if (locationType === 'source') {
				this.shipment.load.source = locationDb;
			} else {
				this.shipment.load.destination = locationDb;
			}
		}, (res: Response) => {
			const json = res.json();
			if (json.hasOwnProperty('message')) {
				this.errors = [json];
			} else {
				this.errors = json._embedded.errors;
			}
		});
	}

	saveDestinationLocation() {
		this.addLocation(this.shipment.load.destination);
	}

	openAddItemDialog(itemId?: number) {
		this.isLoading = true;

		let config = new MdDialogConfig();
		config.disableClose = true;

		let userClientData = { "mode": itemId !== undefined ? "edit" : "add", "type": "C", "id": itemId };
		config.data = userClientData;

		this.itemDialogRef = this.dialog.open(ItemDialog, config);

		this.itemDialogRef.afterClosed().subscribe(clientUser => {
			if (clientUser !== undefined) {
				this.shipment.load.items.push(clientUser);
			}
			this.itemDialogRef = null;
			this.isLoading = false;
		});
	}

	editItem(items: Item[]) {
		this.openAddItemDialog(items[0].id);
	}

	removeItem(items: Item[]) {

		this.isLoading = true;
		this.confirmationDialogRef = this.dialog.open(ConfirmationDialog, {
			disableClose: true,
			data: "Are you sure want to delete trailer : " + items[0].itemId
		});

		this.confirmationDialogRef.afterClosed().subscribe(msg => {
			if (msg) {
				items.forEach(screenAdd => {
					//this.trailerService.removeTrailer(screenAdd.id).subscribe(result => {
					//});
				});
			}
			this.confirmationDialogRef = null;
			this.isLoading = false;
		}, error => {
			console.log("Error occured " + error);
		}, () => {
			//this.buildTrailerList();
		});
	}
}
