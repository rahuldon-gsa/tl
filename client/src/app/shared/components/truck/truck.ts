import { User } from '../../../user/user';
import { Address } from './../address/address';

export class Truck {
	id: number;

	truckId: string;
	owner: User;
	currentMileage: string;
	permitExpirationDate: any;
	updatedBy: string;
	color: string;
	truckType: string;
	inspectionType: string;
	description: string;
	insuranceType: string;
	numberOfWheels: string;
	grossWeight: number;
	permitType: string;
	inspectionExpirationDate: any;
	fuelType: string;
	createdBy: string;
	licenseNumber: string;
	permanentAddress: Address;
	gallonsCapacity: number;
	classType: string;
	pullingCapacity: number;
	status: string;

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
		return 'com.wits.biz.Truck : ' + (this.id ? this.id : '(unsaved)');
	}
}