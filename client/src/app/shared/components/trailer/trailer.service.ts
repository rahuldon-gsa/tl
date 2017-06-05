import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Trailer } from './trailer';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../services/base.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { StatusType } from '../../enum/status-type';
import { TrailerType } from '../../enum/trailer-type';
import { TrailerWeightType } from '../../enum/trailer-weight-type';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/company';
import { User } from '../../../user/user';
import { UserService } from '../../../user/user.service';
import { Address } from '../address/address';

@Injectable()
export class TrailerService extends BaseService {

	private companyId = sessionStorage.getItem("companyId");
	private loggedInUser = sessionStorage.getItem("userId");

	private baseUrl = environment.serverUrl;

	constructor(private http: Http, private companyService: CompanyService, private userService: UserService) {
		super();
	}

	trailerTypes = this.getEnumValues(TrailerType);
	weightTypes = this.getEnumValues(TrailerWeightType);
	userList: User[] = [];
	addressList: Address[] = [];

	getAllUsers(): Observable<User[]> {

		// Getting fresh list from DB after adding new record
		let subject = new Subject<User[]>();
		this.userService.findAllUserByCompanyId(+this.companyId).subscribe((userList: User[]) => {
			this.userList = userList;
			subject.next(userList);
		});
		return subject.asObservable();
	}

	getAllAddresses(): Observable<Address[]> {
		let subject = new Subject<Address[]>();
		this.companyService.getAllCompanyAddresses(+this.companyId).subscribe((addList: Address[]) => {
			this.addressList = addList;
			subject.next(addList);
		});
		return subject.asObservable();
	}

	findAllByCompanyId(companyId: number): Observable<Trailer[]> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = environment.serverUrl + 'trailer/findAllCompanyTrailers?companyId=' + companyId;
		options.method = RequestMethod.Post;
		let subject = new Subject<Trailer[]>();
		this.http.request(new Request(options)).map((r: Response) => r.json())
			.subscribe((json: any[]) => {
				subject.next(json.map((item: any) => new Trailer(item)))
			});
		return subject.asObservable();
	}

	removeTrailer(trailerId: number): Observable<boolean> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = this.baseUrl + 'trailer/updateStatus?trailerId=' + trailerId + '&status=' + StatusType.DELETED.toString();
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options)).map((r: Response) => r.ok).catch(() => {
			return Observable.of(false);
		});
	}

	list(): Observable<Trailer[]> {
		let subject = new Subject<Trailer[]>();
		this.http.get(this.baseUrl + 'trailer')
			.map((r: Response) => r.json())
			.subscribe((json: any[]) => {
				subject.next(json.map((item: any) => new Trailer(item)))
			});
		return subject.asObservable();
	}

	get(id: number): Observable<Trailer> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = this.baseUrl + 'trailer/findTrailerById?trailerId=' + id;
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options)).map((r: Response) => new Trailer(r.json()));
	}

	save(trailer: Trailer): Observable<Trailer> {
		const requestOptions = new RequestOptions();
		if (trailer.id) {
			trailer.updatedBy = this.loggedInUser;
			requestOptions.method = RequestMethod.Put;
			requestOptions.url = this.baseUrl + 'trailer/' + trailer.id;
		} else {
			trailer.status = StatusType.INITIAL.toString();
			trailer.createdBy = this.loggedInUser;
			trailer.updatedBy = this.loggedInUser;
			requestOptions.method = RequestMethod.Post;
			requestOptions.url = this.baseUrl + 'trailer';
		}
		requestOptions.body = JSON.stringify(trailer);
		requestOptions.headers = this.getHeaderToken();

		return this.http.request(new Request(requestOptions))
			.map((r: Response) => new Trailer(r.json()));
	}

	destroy(trailer: Trailer): Observable<boolean> {
		return this.http.delete(this.baseUrl + 'trailer/' + trailer.id).map((res: Response) => res.ok).catch(() => {
			return Observable.of(false);
		});
	}
}