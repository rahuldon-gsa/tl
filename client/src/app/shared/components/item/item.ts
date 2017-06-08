

export class Item {
	id: number;
	description: string;
	updatedBy: string;
	freightClass: string;
	createdBy: string;
	type: string;
	status: string;
	length: number;
	width: number;
	height: number;
	weight: number;
	weightType: string;
	itemId: string;
	goodsType: string;

	constructor(object?: any) {
		if (object) {

			for (var prop in object) {
				this[prop] = object[prop];
			}
		}

	}

	toString(): string {
		return 'com.wits.logistics.Item : ' + (this.id ? this.id : '(unsaved)');
	}
}