import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Truck } from './truck';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../services/base.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class TruckService extends BaseService {

	private baseUrl = environment.serverUrl;

	constructor(private http: Http) {
		super();
	}
	list(): Observable<Truck[]> {
		let subject = new Subject<Truck[]>();
		this.http.get(this.baseUrl + 'truck')
			.map((r: Response) => r.json())
			.subscribe((json: any[]) => {
				subject.next(json.map((item: any) => new Truck(item)))
			});
		return subject.asObservable();
	}

	get(id: number): Observable<Truck> {
		return this.http.get(this.baseUrl + 'truck/' + id)
			.map((r: Response) => new Truck(r.json()));
	}

	save(truck: Truck): Observable<Truck> {
		const requestOptions = new RequestOptions();
		if (truck.id) {
			requestOptions.method = RequestMethod.Put;
			requestOptions.url = this.baseUrl + 'truck/' + truck.id;
		} else {
			requestOptions.method = RequestMethod.Post;
			requestOptions.url = this.baseUrl + 'truck';
		}
		requestOptions.body = JSON.stringify(truck);
		requestOptions.headers = this.getHeaderToken();

		return this.http.request(new Request(requestOptions))
			.map((r: Response) => new Truck(r.json()));
	}

	destroy(truck: Truck): Observable<boolean> {
		return this.http.delete(this.baseUrl + 'truck/' + truck.id).map((res: Response) => res.ok).catch(() => {
			return Observable.of(false);
		});
	}
}