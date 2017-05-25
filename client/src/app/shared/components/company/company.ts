import { Address } from '../address/address';
import { Client } from '../client/client';

export class Company {
  id: number;

  ein: string;
  description: string;
  stateId: string;
  agent: string;
  address: Address;
  clients: Client[];
  entityType: string;
  name: string;
  registeredState: string;

  constructor (object?: any) {
    if (object) {
      
      if (object.hasOwnProperty('address')) {
        this.address = new Address(object['address']);
        delete object['address'];
      }
      
      if (object.hasOwnProperty('clients')) {
        this.clients = object['clients'].map((obj: any) => { return new Client(obj); });
        delete object['clients'];
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