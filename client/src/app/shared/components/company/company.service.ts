import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Company } from './company';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../services/base.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { UserService } from '../../../user/user.service';
import { User } from '../../../user/user';
import { Address } from '../address/address';
import { AddressService } from '../address/address.service';

@Injectable()
export class CompanyService extends BaseService {

	private baseUrl = environment.serverUrl;

	constructor(private http: Http, private userService: UserService, private addressService: AddressService) {
		super();
	}

	getAllCompanyAddresses(companyId: number): Observable<Address[]> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = environment.serverUrl + 'company/findAllAddresses?companyId=' + companyId;
		options.method = RequestMethod.Post;
		let subject = new Subject<Address[]>();
		this.http.request(new Request(options)).map((r: Response) => r.json())
			.subscribe((json: any[]) => {
				subject.next(json.map((item: any) => new Address(item)))
			});
		return subject.asObservable();
	}

	getAllCompanyUsers(companyId: number): Observable<User[]> {
		let users = [];
		let userList = [];
		this.get(companyId).subscribe(res => {
			res.users.forEach(user => {
				users.push(user.id);
			});
			users.push(res.agent.id);
		});

		users.forEach(userId => {
			this.userService.get(userId).subscribe(dbUser => {
				userList.push(dbUser);
			});
		});
		let subject = new Subject<User[]>();
		subject.next(userList)
		return subject.asObservable();
	}

	attachUserToCompany(userId: number, companyId: number): Observable<boolean> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = environment.serverUrl + 'company/attachUserToCompany?userId=' + userId + '&companyId=' + companyId;
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options)).map((res: Response) => res.ok).catch(() => {
			return Observable.of(false);
		});
	}

	findCompanyByUser(userId: number): Observable<Company> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = environment.serverUrl + 'company/findCompanyByUserId?userId=' + userId;
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options)).map((r: Response) => new Company(r.json()));
	}

	list(): Observable<Company[]> {
		let subject = new Subject<Company[]>();
		this.http.get(this.baseUrl + 'company')
			.map((r: Response) => r.json())
			.subscribe((json: any[]) => {
				subject.next(json.map((item: any) => new Company(item)))
			});
		return subject.asObservable();
	}

	get(id: number): Observable<Company> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = this.baseUrl + 'company/findCompanyById?companyId=' + id;
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options)).map((r: Response) => new Company(r.json()));
	}

	save(company: Company): Observable<Company> {
		const requestOptions = new RequestOptions();
		if (company.id) {
			requestOptions.method = RequestMethod.Put;
			requestOptions.url = this.baseUrl + 'company/' + company.id;
		} else {
			requestOptions.method = RequestMethod.Post;
			requestOptions.url = this.baseUrl + 'company';
		}
		requestOptions.body = JSON.stringify(company);
		requestOptions.headers = this.getHeaderToken();

		return this.http.request(new Request(requestOptions))
			.map((r: Response) => new Company(r.json()));
	}

	destroy(company: Company): Observable<boolean> {
		return this.http.delete(this.baseUrl + 'company/' + company.id).map((res: Response) => res.ok).catch(() => {
			return Observable.of(false);
		});
	}
}