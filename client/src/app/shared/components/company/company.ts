import { Address } from '../address/address';
import { Client } from '../client/client';
import { User } from '../../../user/user';

export class Company {
	id: number;

	ein: string;
	description: string;
	stateId: string;
	agent: User;
	address: Address;
	clients: Client[];
	entityType: string;
	name: string;
	registeredState: string;
	createdBy: string;
	updatedBy: string;
	status: string;
	users: User[];
	addresses: Address[];


	constructor(object?: any) {
		if (object) {

			if (object.hasOwnProperty('address')) {
				this.address = new Address(object['address']);
				delete object['address'];
			}

			if (object.hasOwnProperty('clients')) {
				this.clients = object['clients'].map((obj: any) => { return new Client(obj); });
				delete object['clients'];
			}

			if (object.hasOwnProperty('addresses')) {
				this.addresses = object['addresses'].map((obj: any) => { return new Address(obj); });
				delete object['addresses'];
			} else {
				this.addresses = [];
			}

			if (object.hasOwnProperty('users')) {
				this.users = object['users'].map((obj: any) => { return new User(obj); });
				delete object['users'];
			} else {
				this.users = [];
			}

			for (var prop in object) {
				this[prop] = object[prop];
			}
		}

	}

	toString(): string {
		return 'com.wits.biz.Company : ' + (this.id ? this.id : '(unsaved)');
	}
}