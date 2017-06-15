import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../services/base.service';
import { Shipment } from './shipment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { StatusType } from '../../enum/status-type';
import { LoadArrangmentType } from '../../enum/load-arrangment-type';
import { TrailerType } from '../../enum/trailer-type';
import { ShipmentTypes } from '../../enum/shipment-type';
import { Client } from '../client/client';
import { LoadService } from '../load/load.service';
import { Load } from '../load/load';

@Injectable()
export class ShipmentService extends BaseService {

	private companyId = sessionStorage.getItem("companyId");
	private loggedInUser = sessionStorage.getItem("userId");

	locationArrangementTypes = this.getEnumValues(LoadArrangmentType);
	pickUpTimeList = ['0-4', '5-9', '10-14', '15-19', '20-24'];
	trailerTypes = this.getEnumValues(TrailerType);
	shipmentTypes = this.getEnumValues(ShipmentTypes);


	private baseUrl = environment.serverUrl;

	constructor(private http: Http, private loadService: LoadService) {
		super();
	}

	findAllClients(companyId: number): Observable<Client[]> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = environment.serverUrl + 'client/findAllClients?companyId=' + companyId;
		options.method = RequestMethod.Post;
		let subject = new Subject<Client[]>();
		this.http.request(new Request(options)).map((r: Response) => r.json())
			.subscribe((json: any[]) => {
				subject.next(json.map((item: any) => new Client(item)))
			});
		return subject.asObservable();
	}

	removeShipment(shipmentId: number): Observable<boolean> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = this.baseUrl + 'shipment/updateStatus?shipmentId=' + shipmentId + '&status=' + StatusType.DELETED.toString();
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options)).map((r: Response) => r.ok).catch(() => {
			return Observable.of(false);
		});
	}

	list(): Observable<Shipment[]> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = environment.serverUrl + 'shipment';
		options.method = RequestMethod.Post;
		let subject = new Subject<Shipment[]>();
		this.http.get(this.baseUrl + 'shipment')
			.map((r: Response) => r.json())
			.subscribe((json: any[]) => {
				subject.next(json.map((item: any) => new Shipment(item)))
			});
		return subject.asObservable();
	}

	get(id: number): Observable<Shipment> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = this.baseUrl + 'shipment/findShipmentById?shipmentId=' + id;
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options)).map((r: Response) => new Shipment(r.json()));
	}

	save(shipment: Shipment): Observable<Shipment> {
		const requestOptions = new RequestOptions();

		// Save Load First
		/*
		this.loadService.save(shipment.load).subscribe((load: Load) => {
			console.log('Load Saved' + load.id);
		}, err => { }, () => {

		});
		*/

		if (shipment.id) {
			shipment.updatedBy = this.loggedInUser;
			requestOptions.method = RequestMethod.Put;
			requestOptions.url = this.baseUrl + 'shipment/' + shipment.id;
		} else {
			shipment.load = null;
			shipment.status = StatusType.INITIAL.toString();
			shipment.createdBy = this.loggedInUser;
			shipment.updatedBy = this.loggedInUser;
			requestOptions.method = RequestMethod.Post;
			requestOptions.url = this.baseUrl + 'shipment';
		}
		requestOptions.body = JSON.stringify(shipment);
		requestOptions.headers = this.getHeaderToken();

		return this.http.request(new Request(requestOptions))
			.map((r: Response) => new Shipment(r.json()));
	}

	attachShipmentToClient(client: Client): Observable<Client> {
		const requestOptions = new RequestOptions();
		requestOptions.method = RequestMethod.Put;
		requestOptions.url = this.baseUrl + 'client/' + client.id;
		requestOptions.body = JSON.stringify(client);
		requestOptions.headers = this.getHeaderToken();
		this.http.request(new Request(requestOptions));
		return this.http.request(new Request(requestOptions))
			.map((r: Response) => new Client(r.json()));
	}

	getClient(id: number): Observable<Client> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = this.baseUrl + 'client/findClientById?clientId=' + id;
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options)).map((r: Response) => new Client(r.json()));
	}


	destroy(shipment: Shipment): Observable<boolean> {
		return this.http.delete(this.baseUrl + 'shipment/' + shipment.id).map((res: Response) => res.ok).catch(() => {
			return Observable.of(false);
		});
	}
}