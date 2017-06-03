import { User } from '../../../user/user';
import { Address } from './../address/address';

export class Truck {
	id: number;

	truckId: string;
	licenseNumber: string; // Plate Number
	truckType: string;
	classType: string;
	permitType: string;
	owner: User;
	permanentAddress: Address;
	gallonsCapacity: number;
	pullingCapacity: number;
	grossWeight: number;
	unladenWeight: number; // Empty Weight
	vinNumber: string;
	axles: string; // 4×2, 6×2 and 6×4
	gvwr: number; //  GROSS VEHICLE WEIGHT RATING GVWR
	fuelType: string;
	seatingCpacity: string;

	status: string;
	currentMileage: number;
	permitExpirationDate: any;
	updatedBy: string;
	color: string;
	inspectionType: string;
	description: string;
	insuranceType: string;
	numberOfWheels: string;
	inspectionExpirationDate: any;
	createdBy: string;
	titleNumber: string;
	year: string;
	make: string;
	model: string;
	gcwr: number; // GROSS COMBINATION WEIGHT RATING GCWR


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