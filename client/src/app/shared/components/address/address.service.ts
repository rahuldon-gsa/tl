import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Address } from './address';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../services/base.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class AddressService extends BaseService{

  private baseUrl = environment.serverUrl;

  constructor(private http: Http) {
    super();
  }  

  addressListByUserId(userId: number): Observable<Address[]> {
    let subject = new Subject<Address[]>();

    const options = new RequestOptions();
    options.headers = this.getHeaderToken();
    options.url = environment.serverUrl + 'user/findAddresses?userId=' + userId;
    options.method = RequestMethod.Post;

    this.http.request(new Request(options))
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Address(item)))
      });
    return subject.asObservable();
  }


  list(): Observable<Address[]> {
    let subject = new Subject<Address[]>();
    this.http.get(this.baseUrl + 'address')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Address(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Address> {
    const options = new RequestOptions();
    options.headers = this.getHeaderToken();
    options.url = this.baseUrl + 'address/' + id;
    options.method = RequestMethod.Post;
    return this.http.request(new Request(options)).map((r: Response) => new Address(r.json()));
  }

  save(address: Address): Observable<Address> {
    const requestOptions = new RequestOptions();
    if (address.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'address/' + address.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'address';
    }
    requestOptions.body = JSON.stringify(address);
    requestOptions.headers = new Headers({ "Content-Type": "application/json" });

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Address(r.json()));
  }

  destroy(address: Address): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'address/' + address.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}