import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ClientUser } from './clientUser';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../services/base.service';
import { StatusType } from '../../enum/status-type';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ClientUserService extends BaseService {

	private loggedInUser = sessionStorage.getItem("userId");

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

	removeClientUser(userId: number): Observable<boolean> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = this.baseUrl + 'clientUser/updateStatus?userId=' + userId + '&status=' + StatusType.DELETED.toString();
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options)).map((r: Response) => r.ok).catch(() => {
			return Observable.of(false);
		});
	}

	clientUserById(userId: number): Observable<ClientUser> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = environment.serverUrl + 'clientUser/findUserById?userId=' + userId;
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options)).map((r: Response) => new ClientUser(r.json()));
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
			clientUser.status = StatusType.INITIAL.toString();
			clientUser.createdBy = this.loggedInUser;
			clientUser.updatedBy = this.loggedInUser;

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