import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Address } from './address';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../services/base.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import * as _ from "lodash";
declare var System: any;

@Injectable()
export class AddressService extends BaseService {

	countries = [
		{ code: 'US', description: 'USA' },
		{ code: 'CD', description: 'Canada' },
		{ code: 'MX', description: 'Mexico' }
	];
	stateList = [];

	private baseUrl = environment.serverUrl;

	constructor(private http: Http) {
		super();

		System.import('../../data/states.json').then(file => {
			this.stateList = _.toArray(file);
		});
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

	addressById(addId: number): Observable<Address> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = environment.serverUrl + 'address/findAddressById?addressId=' + addId;
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options)).map((r: Response) => new Address(r.json()));
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
		requestOptions.headers = this.getHeaderToken();

		return this.http.request(new Request(requestOptions))
			.map((r: Response) => new Address(r.json()));
	}

	destroy(address: Address): Observable<boolean> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = this.baseUrl + 'address/' + address.id;
		options.method = RequestMethod.Delete;
		return this.http.request(new Request(options)).map((r: Response) => r.ok).catch(() => {
			return Observable.of(false);
		});
	}
}