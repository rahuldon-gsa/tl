import { Location } from '../location/location';
import { Item } from '../item/item';

export class Load {
	id: number;

	description: string;
	trailerType: string;
	updatedBy: string;
	needHelp: boolean;
	destination: Location;
	source: Location;
	goodsType: string;
	isTrailerReady: boolean;
	loadId: string;
	createdBy: string;
	needForkLift: boolean;
	items: Item[];
	status: string;
	isHazardous: boolean;
	isStackable: boolean;
	permitDocLocation: string;
	trailerSize: string;

	constructor(object?: any) {
		if (object) {

			if (object.hasOwnProperty('destination')) {
				this.destination = new Location(object['destination']);
				delete object['destination'];
			}

			if (object.hasOwnProperty('source')) {
				this.source = new Location(object['source']);
				delete object['source'];
			}

			if (object.hasOwnProperty('items')) {
				this.items = object['items'].map((obj: any) => { return new Item(obj); });
				delete object['items'];
			}

			for (var prop in object) {
				this[prop] = object[prop];
			}
		}

	}

	toString(): string {
		return 'com.wits.logistics.Load : ' + (this.id ? this.id : '(unsaved)');
	}
}