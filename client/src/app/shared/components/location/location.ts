

export class Location {
	id: number;
	name: string;
	address2: string;
	latitude: number;
	longitude: number;
	description: string;
	zipCode: string;
	country: string;
	updatedBy: string;
	city: string;
	address1: string;
	type: string;
	createdBy: string;
	state: string;
	status: string;
	startDate: any;
	startTime: string;
	locationId: string;
	daysToDeliver: string;

	constructor(object?: any) {
		if (object) {

			for (var prop in object) {
				this[prop] = object[prop];
			}
		}

	}

	toString(): string {
		return 'com.wits.logistics.Location : ' + (this.id ? this.id : '(unsaved)');
	}
}