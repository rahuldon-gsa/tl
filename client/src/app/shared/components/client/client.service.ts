import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Client } from './client';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../services/base.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ClientService extends BaseService {

	private baseUrl = environment.serverUrl;

	constructor(private http: Http) {
		super();
	}

	list(): Observable<Client[]> {
		let subject = new Subject<Client[]>();
		this.http.get(this.baseUrl + 'client')
			.map((r: Response) => r.json())
			.subscribe((json: any[]) => {
				subject.next(json.map((item: any) => new Client(item)))
			});
		return subject.asObservable();
	}

	get(id: number): Observable<Client> {
		return this.http.get(this.baseUrl + 'client/' + id)
			.map((r: Response) => new Client(r.json()));
	}

	save(client: Client): Observable<Client> {
		const requestOptions = new RequestOptions();
		if (client.id) {
			requestOptions.method = RequestMethod.Put;
			requestOptions.url = this.baseUrl + 'client/' + client.id;
		} else {
			requestOptions.method = RequestMethod.Post;
			requestOptions.url = this.baseUrl + 'client';
		}
		requestOptions.body = JSON.stringify(client);
		requestOptions.headers = new Headers({ "Content-Type": "application/json" });

		return this.http.request(new Request(requestOptions))
			.map((r: Response) => new Client(r.json()));
	}

	destroy(client: Client): Observable<boolean> {
		return this.http.delete(this.baseUrl + 'client/' + client.id).map((res: Response) => res.ok).catch(() => {
			return Observable.of(false);
		});
	}
}