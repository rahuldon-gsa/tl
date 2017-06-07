import { Location } from '../location/location';
import { Location } from '../location/location';
import { Package } from '../package/package';

export class Load {
  id: number;

  description: string;
  trailerType: string;
  updatedBy: string;
  needHelp: boolean;
  destination: Location;
  source: Location;
  type: string;
  packages: Package[];
  isTrailerReady: boolean;
  createdBy: string;
  needForkLift: boolean;
  status: string;

  constructor (object?: any) {
    if (object) {
      
      if (object.hasOwnProperty('destination')) {
        this.destination = new Location(object['destination']);
        delete object['destination'];
      }
      
      if (object.hasOwnProperty('source')) {
        this.source = new Location(object['source']);
        delete object['source'];
      }
      
      if (object.hasOwnProperty('packages')) {
        this.packages = object['packages'].map((obj: any) => { return new Package(obj); });
        delete object['packages'];
      }
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'com.wits.logistics.Load : ' + (this.id ? this.id : '(unsaved)');
  }
}