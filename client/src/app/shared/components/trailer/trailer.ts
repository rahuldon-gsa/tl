import { User } from '../../../user/user';
import { Address } from './../address/address';

export class Trailer {
	id: number;

	owner: User;
	updatedBy: string;
	length: string;
	description: string;
	type: string;
	createdBy: string;
	width: string;
	licenseNumber: string;
	loadingType: string;
	permanentAddress: Address;
	trailerId: string;
	status: string;
	gvwr: number; //  GROSS VEHICLE WEIGHT RATING GVWR
	unladenWeight: number; // Empty Weight	

	constructor(object?: any) {
		if (object) {

			if (object.hasOwnProperty('owner')) {
				this.owner = new User(object['owner']);
				delete object['owner'];
			}

			if (object.hasOwnProperty('permanentAddress')) {
				this.permanentAddress = new Address(object['permanentAddress']);
				delete object['permanentAddress'];
			}

			for (var prop in object) {
				this[prop] = object[prop];
			}
		}

	}

	toString(): string {
		return 'com.wits.biz.Trailer : ' + (this.id ? this.id : '(unsaved)');
	}
}