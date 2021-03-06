

export class ClientUser {
	id: number;

	phoneNumber: string;
	middleName: string;
	gender: string;
	designation: string;
	firstName: string;
	lastName: string;
	mobile: string;
	type: string;
	email: string;
	createdBy: string;
	updatedBy: string;
	status: string; // Initial, Active, Disabled, Verified  
	description: string;

	constructor(object?: any) {
		if (object) {

			for (var prop in object) {
				this[prop] = object[prop];
			}
		}

	}

	toString(): string {
		return 'com.wits.biz.ClientUser : ' + (this.id ? this.id : '(unsaved)');
	}
}