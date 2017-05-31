import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ClientUser } from './clientUser';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../services/base.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ClientUserService extends BaseService {

	private baseUrl = environment.serverUrl;

	constructor(private http: Http) {
		super();
	}

	list(): Observable<ClientUser[]> {
		let subject = new Subject<ClientUser[]>();
		this.http.get(this.baseUrl + 'clientUser')
			.map((r: Response) => r.json())
			.subscribe((json: any[]) => {
				subject.next(json.map((item: any) => new ClientUser(item)))
			});
		return subject.asObservable();
	}

	get(id: number): Observable<ClientUser> {
		return this.http.get(this.baseUrl + 'clientUser/' + id)
			.map((r: Response) => new ClientUser(r.json()));
	}

	save(clientUser: ClientUser): Observable<ClientUser> {
		const requestOptions = new RequestOptions();

		clientUser.type = "CLIENT";

		if (clientUser.id) {
			requestOptions.method = RequestMethod.Put;
			requestOptions.url = this.baseUrl + 'clientUser/' + clientUser.id;
		} else {
			requestOptions.method = RequestMethod.Post;
			requestOptions.url = this.baseUrl + 'clientUser';
		}
		requestOptions.body = JSON.stringify(clientUser);
		requestOptions.headers = this.getHeaderToken();

		return this.http.request(new Request(requestOptions))
			.map((r: Response) => new ClientUser(r.json()));
	}

	destroy(clientUser: ClientUser): Observable<boolean> {
		return this.http.delete(this.baseUrl + 'clientUser/' + clientUser.id).map((res: Response) => res.ok).catch(() => {
			return Observable.of(false);
		});
	}
}