import { Load } from '../load/load';

export class Shipment {
	id: number;

	description: string;
	updatedBy: string;
	load: Load;
	createdBy: string;
	shipmentId: string;
	type: string;
	status: string;

	constructor(object?: any) {
		if (object) {

			if (object.hasOwnProperty('load')) {
				this.load = new Load(object['load']);
				delete object['load'];
			}

			for (var prop in object) {
				this[prop] = object[prop];
			}
		}

	}

	toString(): string {
		return 'com.wits.logistics.Shipment : ' + (this.id ? this.id : '(unsaved)');
	}
}