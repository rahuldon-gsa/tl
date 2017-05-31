

export class User {
	id: number;

	username: string;
	password: string;
	email: string;
	middleName: string;
	designation: string;
	accountLocked: boolean;
	lastName: string;
	gender: string;
	mobile: string;
	dateOfBirth: any;
	enabled: boolean;
	firstName: string;
	phoneNumber: string;
	accountExpired: boolean;
	passwordExpired: boolean;
	companyId: string;

	constructor(object?: any) {
		if (object) {

			for (var prop in object) {
				this[prop] = object[prop];
			}
		}

	}

	toString(): string {
		return 'com.wits.sec.User : ' + (this.id ? this.id : '(unsaved)');
	}
}