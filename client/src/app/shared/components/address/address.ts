export class Address {
	id: number;

	address2: string;
	latitude: number;
	longitude: number;
	userId: string;
	zipCode: string;
	country: string;
	city: string;
	address1: string;
	state: string;
	type: string;
	description: string;
	createdBy: string;
	updatedBy: string;
	status: string; // Initial, Active, Disabled, Verified , Deleted

	constructor(object?: any) {
		if (object) {
			for (var prop in object) {
				this[prop] = object[prop];
			}
		}

	}

	toString(): string {
		return 'com.wits.core.Address : ' + (this.id ? this.id : '(unsaved)');
	}
}