import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Load } from './load';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../services/base.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { StatusType } from '../../enum/status-type';

@Injectable()
export class LoadService extends BaseService {

	private companyId = sessionStorage.getItem("companyId");
	private loggedInUser = sessionStorage.getItem("userId");

	private baseUrl = environment.serverUrl;
	constructor(private http: Http) {
		super();
	}

	list(): Observable<Load[]> {
		let subject = new Subject<Load[]>();
		this.http.get(this.baseUrl + 'load')
			.map((r: Response) => r.json())
			.subscribe((json: any[]) => {
				subject.next(json.map((item: any) => new Load(item)))
			});
		return subject.asObservable();
	}

	get(id: number): Observable<Load> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = this.baseUrl + 'load/findLoadById?loadId=' + id;
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options)).map((r: Response) => new Load(r.json()));
	}

	save(load: Load): Observable<Load> {
		const requestOptions = new RequestOptions();
		if (load.id) {
			load.updatedBy = this.loggedInUser;
			requestOptions.method = RequestMethod.Put;
			requestOptions.url = this.baseUrl + 'load/' + load.id;
		} else {
			load.status = StatusType.INITIAL.toString();
			load.createdBy = this.loggedInUser;
			load.updatedBy = this.loggedInUser;
			requestOptions.method = RequestMethod.Post;
			requestOptions.url = this.baseUrl + 'load';
		}
		requestOptions.body = JSON.stringify(load);
		requestOptions.headers = this.getHeaderToken();

		return this.http.request(new Request(requestOptions))
			.map((r: Response) => new Load(r.json()));
	}

	destroy(load: Load): Observable<boolean> {
		return this.http.delete(this.baseUrl + 'load/' + load.id).map((res: Response) => res.ok).catch(() => {
			return Observable.of(false);
		});
	}
}