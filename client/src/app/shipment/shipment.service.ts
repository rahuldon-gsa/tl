import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Shipment} from './shipment';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ShipmentService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<Shipment[]> {
    let subject = new Subject<Shipment[]>();
    this.http.get(this.baseUrl + 'shipment')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Shipment(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Shipment> {
    return this.http.get(this.baseUrl + 'shipment/'+id)
      .map((r: Response) => new Shipment(r.json()));
  }

  save(shipment: Shipment): Observable<Shipment> {
    const requestOptions = new RequestOptions();
    if (shipment.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'shipment/' + shipment.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'shipment';
    }
    requestOptions.body = JSON.stringify(shipment);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Shipment(r.json()));
  }

  destroy(shipment: Shipment): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'shipment/' + shipment.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}