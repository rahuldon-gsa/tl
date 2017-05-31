import { Address } from '../address/address';
import { User } from '../../../user/user';
import { Company } from '../company/company';

export class Client {
	id: number;

	registeredAddress: Address;
	pointOfContact: User;
	addresses: Address[];
	clientId: string;
	phoneNumber: string;
	name: string;
	company: Company;
	email: string;
	createdBy: string;
	updatedBy: string;
	status: string; // Initial, Active, Disabled, Verified  

	constructor(object?: any) {
		if (object) {

			if (object.hasOwnProperty('registeredAddress')) {
				this.registeredAddress = new Address(object['registeredAddress']);
				delete object['registeredAddress'];
			}

			if (object.hasOwnProperty('pointOfContact')) {
				this.pointOfContact = new User(object['pointOfContact']);
				delete object['pointOfContact'];
			}

			if (object.hasOwnProperty('addresses')) {
				this.addresses = object['addresses'].map((obj: any) => { return new Address(obj); });
				delete object['addresses'];
			}

			if (object.hasOwnProperty('company')) {
				this.company = new Company(object['company']);
				delete object['company'];
			}

			for (var prop in object) {
				this[prop] = object[prop];
			}
		}

	}

	toString(): string {
		return 'com.wits.biz.Client : ' + (this.id ? this.id : '(unsaved)');
	}
}