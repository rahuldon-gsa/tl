import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { BaseService } from '../shared/services/base.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class UserService extends BaseService {

	private baseUrl = environment.serverUrl;

	constructor(private http: Http) {
		super();
	}

	designationTypes = [
		{ code: 'ADMIN', description: 'Admin' },
		{ code: 'DISP', description: 'Dispatcher' },
		{ code: 'OFFICE', description: 'Office Staff' },
		{ code: 'DRIVER', description: 'Driver' },
		{ code: 'HELPER', description: 'Helper' },
		{ code: 'OTHER', description: 'Other' }
	];

	getUserInfo(username: string): Observable<User> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = environment.serverUrl + 'user/findByUsername?username=' + username;
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options)).map((r: Response) => new User(r.json()));
	}

	list(): Observable<User[]> {
		let subject = new Subject<User[]>();
		this.http.get(this.baseUrl + 'user')
			.map((r: Response) => r.json())
			.subscribe((json: any[]) => {
				subject.next(json.map((item: any) => new User(item)))
			});
		return subject.asObservable();
	}

	get(id: number): Observable<User> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = environment.serverUrl + 'user/findById?userId=' + id;
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options)).map((r: Response) => new User(r.json()));
	}

	save(user: User): Observable<User> {
		const requestOptions = new RequestOptions();
		if (user.id) {
			requestOptions.method = RequestMethod.Put;
			requestOptions.url = this.baseUrl + 'user/' + user.id;
		} else {
			requestOptions.method = RequestMethod.Post;
			requestOptions.url = this.baseUrl + 'user';
		}
		requestOptions.body = JSON.stringify(user);
		requestOptions.headers = new Headers({ "Content-Type": "application/json" });

		return this.http.request(new Request(requestOptions))
			.map((r: Response) => new User(r.json()));
	}

	destroy(user: User): Observable<boolean> {
		return this.http.delete(this.baseUrl + 'user/' + user.id).map((res: Response) => res.ok).catch(() => {
			return Observable.of(false);
		});
	}
}