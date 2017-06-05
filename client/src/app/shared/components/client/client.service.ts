import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Client } from './client';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../services/base.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/company';
import { StatusType } from '../../enum/status-type';

@Injectable()
export class ClientService extends BaseService {

	private baseUrl = environment.serverUrl;

	constructor(private http: Http, private companyService: CompanyService) {
		super();
	}

	private companyId = sessionStorage.getItem("companyId");

	findAllByCompanyId(companyId: number): Observable<Client[]> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = environment.serverUrl + 'client/findAllClients?companyId=1=' + companyId;
		options.method = RequestMethod.Post;
		let subject = new Subject<Client[]>();
		this.http.request(new Request(options)).map((r: Response) => r.json())
			.subscribe((json: any[]) => {
				subject.next(json.map((item: any) => new Client(item)))
			});
		return subject.asObservable();
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
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = this.baseUrl + 'client/findClientById?clientId=' + id;
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options)).map((r: Response) => new Client(r.json()));
	}

	save(client: Client): Observable<Client> {

		let company = new Company();
		// Get company ID 
		this.companyService.get(+this.companyId).subscribe(
			data => {
				company = data;
			});
		client.company = company;

		const requestOptions = new RequestOptions();
		if (client.id) {
			requestOptions.method = RequestMethod.Put;
			requestOptions.url = this.baseUrl + 'client/' + client.id;
		} else {
			client.status = StatusType.INITIAL.toString();
			requestOptions.method = RequestMethod.Post;
			requestOptions.url = this.baseUrl + 'client';
		}
		requestOptions.body = JSON.stringify(client);
		requestOptions.headers = this.getHeaderToken();

		return this.http.request(new Request(requestOptions))
			.map((r: Response) => new Client(r.json()));
	}

	destroy(client: Client): Observable<boolean> {
		return this.http.delete(this.baseUrl + 'client/' + client.id).map((res: Response) => res.ok).catch(() => {
			return Observable.of(false);
		});
	}
}