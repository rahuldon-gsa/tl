

export class Shipment {
  id: number;

  description: string;
  updatedBy: string;
  createdBy: string;
  status: string;

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'com.wits.logistics.Shipment : ' + (this.id ? this.id : '(unsaved)');
  }
}