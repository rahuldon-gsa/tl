import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Location } from './location';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../services/base.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { StatusType } from '../../enum/status-type';

@Injectable()
export class LocationService extends BaseService {

	private companyId = sessionStorage.getItem("companyId");
	private loggedInUser = sessionStorage.getItem("userId");

	private baseUrl = environment.serverUrl;
	constructor(private http: Http) {
		super();
	}

	list(): Observable<Location[]> {
		let subject = new Subject<Location[]>();
		this.http.get(this.baseUrl + 'location')
			.map((r: Response) => r.json())
			.subscribe((json: any[]) => {
				subject.next(json.map((item: any) => new Location(item)))
			});
		return subject.asObservable();
	}

	get(id: number): Observable<Location> {

		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = this.baseUrl + 'location/findLocationById?locationId=' + id;
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options)).map((r: Response) => new Location(r.json()));

	}

	save(location: Location): Observable<Location> {
		const requestOptions = new RequestOptions();
		if (location.id) {
			location.updatedBy = this.loggedInUser;
			requestOptions.method = RequestMethod.Put;
			requestOptions.url = this.baseUrl + 'location/' + location.id;
		} else {
			location.status = StatusType.INITIAL.toString();
			location.createdBy = this.loggedInUser;
			location.updatedBy = this.loggedInUser;
			requestOptions.method = RequestMethod.Post;
			requestOptions.url = this.baseUrl + 'location';
		}
		requestOptions.body = JSON.stringify(location);
		requestOptions.headers = this.getHeaderToken();

		return this.http.request(new Request(requestOptions))
			.map((r: Response) => new Location(r.json()));
	}

	destroy(location: Location): Observable<boolean> {
		return this.http.delete(this.baseUrl + 'location/' + location.id).map((res: Response) => res.ok).catch(() => {
			return Observable.of(false);
		});
	}
}