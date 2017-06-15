import { Component, OnInit, HostListener } from '@angular/core';
import { Shipment } from '../../shared/components/shipment/shipment';
import { ShipmentService } from '../../shared/components/shipment/shipment.service';
import { LoadService } from '../../shared/components/load/load.service';
import { Client } from '../../shared/components/client/client';
import { Load } from '../../shared/components/load/load';
import { Location } from '../../shared/components/location/location';
import { LocationService } from '../../shared/components/location/location.service';
import { Item } from '../../shared/components/item/item';
import { ItemService } from '../../shared/components/item/item.service';
import { Response } from "@angular/http";
import * as _ from "lodash";
declare var google: any;

@Component({
	selector: 'app-ship',
	templateUrl: './ship.component.html',
	styleUrls: ['./ship.component.scss'],
	providers: [ShipmentService, LoadService, LocationService, ItemService]
})
export class ShipComponent implements OnInit {

	private loggedInUser = sessionStorage.getItem("userId");
	private companyId = sessionStorage.getItem("companyId");
	shipmentTypes = this.shipmentService.shipmentTypes;
	trailerTypes = this.shipmentService.trailerTypes;
	locationArrangementTypes = this.shipmentService.locationArrangementTypes;
	pickUpTimeList = this.shipmentService.pickUpTimeList;

	shipment = new Shipment();
	isLoading: boolean = false;
	create = true;
	errors: any[];

	clientList: Client[] = [];
	clientShipIds = [];
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

	constructor(private shipmentService: ShipmentService, private locationService: LocationService, private itemService: ItemService) {
		// Get All Clients
		this.shipmentService.findAllClients(+this.companyId).subscribe(clients => {
			this.clientList = clients;
			clients.forEach(client => {
				client.shipments.forEach(ship => {
					this.clientShipIds.push({ clientId: client.id, shipId: ship.id, clientName: client.name });
				});
			});
		});
	}

	ngOnInit() {
		this.shipment.shipmentId = _.random(0, 99999999).toString();
		this.shipment.load = new Load();
		this.shipment.load.loadId = _.random(0, 99999999).toString();
		this.shipment.load.source = new Location();
		this.shipment.load.destination = new Location();
		this.shipment.load.items = [];
		this.initGoogleSearch();
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
		if (this.item.id !== undefined) {
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

}
