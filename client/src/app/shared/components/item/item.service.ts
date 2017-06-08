import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Item } from './item';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../services/base.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { StatusType } from '../../enum/status-type';
import { ItemType } from '../../enum/item-type';

@Injectable()
export class ItemService extends BaseService {

	private companyId = sessionStorage.getItem("companyId");
	private loggedInUser = sessionStorage.getItem("userId");

	private baseUrl = environment.serverUrl;

	constructor(private http: Http) {
		super();
	}

	itemTypes = this.getEnumValues(ItemType);
	freightClassTypes = [50, 55, 60, 65, 70, 77.5, 85, 92.5, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];

	list(): Observable<Item[]> {
		let subject = new Subject<Item[]>();
		this.http.get(this.baseUrl + 'item')
			.map((r: Response) => r.json())
			.subscribe((json: any[]) => {
				subject.next(json.map((item: any) => new Item(item)))
			});
		return subject.asObservable();
	}

	removeItem(trailerId: number): Observable<boolean> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = this.baseUrl + 'item/updateStatus?itemId=' + trailerId + '&status=' + StatusType.DELETED.toString();
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options)).map((r: Response) => r.ok).catch(() => {
			return Observable.of(false);
		});
	}

	get(id: number): Observable<Item> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = this.baseUrl + 'item/findItemById?itemId=' + id;
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options))
			.map((r: Response) => new Item(r.json()));
	}

	save(item: Item): Observable<Item> {
		const requestOptions = new RequestOptions();
		item.weightType = item.weightType ? 'KGS' : 'LBS';
		if (item.id) {
			item.updatedBy = this.loggedInUser;
			requestOptions.method = RequestMethod.Put;
			requestOptions.url = this.baseUrl + 'item/' + item.id;
		} else {
			item.status = StatusType.INITIAL.toString();
			item.createdBy = this.loggedInUser;
			item.updatedBy = this.loggedInUser;
			requestOptions.method = RequestMethod.Post;
			requestOptions.url = this.baseUrl + 'item';
		}
		requestOptions.body = JSON.stringify(item);
		requestOptions.headers = this.getHeaderToken();

		return this.http.request(new Request(requestOptions))
			.map((r: Response) => new Item(r.json()));
	}

	destroy(item: Item): Observable<boolean> {
		return this.http.delete(this.baseUrl + 'item/' + item.id).map((res: Response) => res.ok).catch(() => {
			return Observable.of(false);
		});
	}
}