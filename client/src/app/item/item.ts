

export class Item {
  id: number;

  description: string;
  updatedBy: string;
  freightClass: string;
  createdBy: string;
  type: string;
  status: string;

  constructor (object?: any) {
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