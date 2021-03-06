import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Shipment } from '../../shared/components/shipment/shipment';
import { ShipmentService } from '../../shared/components/shipment/shipment.service';
import { LoadService } from '../../shared/components/load/load.service';
import { Client } from '../../shared/components/client/client';
import { Load } from '../../shared/components/load/load';
import { Location } from '../../shared/components/location/location';
import { LocationService } from '../../shared/components/location/location.service';
import { Item } from '../../shared/components/item/item';
import { ItemService } from '../../shared/components/item/item.service';
import { ClientService } from '../../shared/components/client/client.service';
import { CompanyService } from '../../shared/components/company/company.service';
import { AddressService } from '../../shared/components/address/address.service';
import { Response } from "@angular/http";
import * as _ from "lodash";
declare var google: any;

@Component({
	selector: 'ship-edit',
	templateUrl: './ship-edit.component.html',
	styleUrls: ['./ship.component.scss'],
	providers: [ShipmentService, LoadService, LocationService, ItemService, ClientService, CompanyService, AddressService]
})
export class ShipEditComponent implements OnInit {

	private loggedInUser = sessionStorage.getItem("userId");
	private companyId = sessionStorage.getItem("companyId");
	shipmentTypes = this.shipmentService.shipmentTypes;
	trailerTypes = this.shipmentService.trailerTypes;
	sourceLocationArrangementTypes = this.shipmentService.locationArrangementTypes;
	destinationLocationArrangementTypes = this.shipmentService.locationArrangementTypes;
	pickUpTimeList = this.shipmentService.pickUpTimeList;
	destinationDays = this.shipmentService.destinationDays;

	shipment = new Shipment();
	isLoading: boolean = false;
	create = false;
	errors: any[];

	selectedClient: any;
	selectedShipmentType: any;
	selectedTrailerType: string;
	startDate = new Date();

	// getItem

	selectedItemType: string;
	selectedFreightClass: string;
	selectedGoodType: string;
	item = new Item();
	freightClassTypes = this.itemService.freightClassTypes;
	itemTypes = this.itemService.itemTypes;
	weightTypes = ['lbs', 'kgs'];
	goodsTypes = ['New', 'Old', 'Other'];

	// google
	fromAutocomplete: string;

	constructor(private route: ActivatedRoute, private router: Router, private shipmentService: ShipmentService,
		private locationService: LocationService, private itemService: ItemService, private clientService: ClientService,
		private loadService: LoadService) {
	}

	ngOnInit() {

		this.isLoading = true;;

		this.shipment.load = new Load();
		this.shipment.load.source = new Location();
		this.shipment.load.destination = new Location();
		this.shipment.load.items = [];

		this.initGoogleSearch();

		this.route.queryParams.subscribe(params => {
			this.selectedClient = params['clientName'];
		});

		this.route.params.subscribe((params: Params) => {
			if (params.hasOwnProperty('id')) {
				this.shipmentService.get(+params['id']).subscribe((shipmentDb: Shipment) => {
					this.shipment = shipmentDb;

					// Shipment Type
					this.selectedShipmentType = shipmentDb.type;

					// Find Load, Locations, Item
					this.loadService.get(shipmentDb.load.id).subscribe((loadDb: Load) => {

						this.shipment.load = loadDb;
						this.selectedTrailerType = loadDb.trailerType;

						this.locationService.get(loadDb.source.id).subscribe((sourceLocationDb: Location) => {
							this.shipment.load.source = sourceLocationDb;
						});

						this.locationService.get(loadDb.destination.id).subscribe((destLocationDb: Location) => {
							this.shipment.load.destination = destLocationDb;
						});

						let itemList: Item[] = [];
						loadDb.items.forEach(itemLoad => {
							this.itemService.get(itemLoad.id).subscribe((itemDb: Item) => {
								itemList.push(itemDb);
							});
						});

						this.isLoading = false;
						this.shipment.load.items = itemList;
					});
				});
			}

			// Make id null for add logic
			this.item.id = null;
		});

	}

	initGoogleSearch() {

		// Initialize the search box and autocomplete
		let fromSearchBox: any = document.getElementById('fromAutocomplete');
		let options = {
			types: ['geocode'],
			componentRestrictions: { country: 'us' }
		};
		var autocomplete = new google.maps.places.Autocomplete(fromSearchBox, options);

		// Add listener to the place changed event
		autocomplete.addListener('place_changed', () => {
			let place = autocomplete.getPlace();
			let address: string = place.formatted_address;

			let addList = address.split(',');
			if (addList.length < 4) {
				//this.fromAutocompleteError = true;
			} else {
				this.addAddress(place.geometry.location.lat(), place.geometry.location.lng(), address, 'source');
			}
		});

		let toSearchBox: any = document.getElementById('toAutocomplete');
		var toAutocomplete = new google.maps.places.Autocomplete(toSearchBox, options);

		// Add listener to the place changed event
		toAutocomplete.addListener('place_changed', () => {
			let place = toAutocomplete.getPlace();
			let address: string = place.formatted_address;
			let addList = address.split(',');
			if (addList.length < 4) {
				// this.fromAutocompleteError = true;
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
		this.isLoading = true;
		this.addLocation(this.shipment.load.source, 'source');
		this.isLoading = false;
	}

	saveDestinationLocation() {
		this.isLoading = true;
		this.addLocation(this.shipment.load.destination);
		this.isLoading = false;
	}

	addLocation(location: Location, locationType?: string) {
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

	ownTrailer() {
		this.shipment.load.isTrailerReady = !this.shipment.load.isTrailerReady;
	}

	saveItem() {

		this.item.type = this.selectedItemType;
		this.item.freightClass = this.selectedFreightClass;
		this.item.goodsType = this.selectedGoodType;
		this.item.itemId = _.random(0, 99999999).toString();

		let isItemCreate: boolean = true;
		if (this.item.id !== null) {
			isItemCreate = false;
		}

		this.itemService.save(this.item).subscribe((itemDb: Item) => {

			let instanceItemList = [];

			if (this.shipment.load.items.length < 1) {
				this.shipment.load.items.push(itemDb);
			} else {
				if (isItemCreate) {
					this.shipment.load.items.push(itemDb);
				} else {
					this.shipment.load.items.forEach(storedItem => {
						if (storedItem.id === itemDb.id) {
							instanceItemList.push(itemDb);
						} else {
							instanceItemList.push(storedItem);
						}
					});
					this.shipment.load.items = [];
					this.shipment.load.items = instanceItemList;
				}
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

	editItem(itemId: number) {
		console.log(itemId);
		this.itemService.get(itemId).subscribe(itemDb => {
			this.item = itemDb;
			this.selectedItemType = itemDb.type;
			this.selectedFreightClass = itemDb.freightClass;
			this.selectedGoodType = itemDb.goodsType;
		});
	}

	goBackToList() {
		this.router.navigate(['../ship']);
	}

	createShipment() {
		this.isLoading = true;
		this.shipment.type = this.selectedShipmentType;

		this.shipment.load.trailerType = this.selectedTrailerType;

		this.loadService.save(this.shipment.load).subscribe((loadDb: Load) => {
			console.log('Load Saved' + loadDb.id);

			this.shipment.load = loadDb;

			this.shipmentService.save(this.shipment).subscribe((shipmentDb: Shipment) => {
				this.isLoading = false;
				this.router.navigate(['../ship']);
			}, (res: Response) => {
				const json = res.json();
				if (json.hasOwnProperty('message')) {
					this.errors = [json];
				} else {
					this.errors = json._embedded.errors;
				}
			}, () => {
				//this.router.navigate(['/list']);
			});
		});
	}

}
