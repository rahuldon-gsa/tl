import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Truck } from './truck';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../services/base.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { TruckType } from '../../enum/truck-type';
import { TruckClassType } from '../../enum/truck-class-type';
import { TruckFuelType } from '../../enum/truck-fuel-type';
import { TruckInspectionType } from '../../enum/truck-inspection-type';
import { TruckInsuranceType } from '../../enum/truck-insurance-type';
import { TruckPermitType } from '../../enum/truck-permit-type';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/company';
import { User } from '../../../user/user';
import { UserService } from '../../../user/user.service';
import { Address } from '../address/address';
import { StatusType } from '../../enum/status-type';

@Injectable()
export class TruckService extends BaseService {

	private companyId = sessionStorage.getItem("companyId");
	private loggedInUser = sessionStorage.getItem("userId");

	private baseUrl = environment.serverUrl;

	constructor(private http: Http, private companyService: CompanyService, private userService: UserService) {
		super();
	}

	truckTypes = this.getEnumValues(TruckType);
	classTypes = this.getEnumValues(TruckClassType);
	fuelTypes = this.getEnumValues(TruckFuelType);
	inspectionTypes = this.getEnumValues(TruckInspectionType);
	insuranceTypes = this.getEnumValues(TruckInsuranceType);
	permitTypes = this.getEnumValues(TruckPermitType);
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

	getEnumValues(enumClass) {
		let listToHold = [];
		Object.keys(enumClass).forEach(val => {
			if (enumClass.hasOwnProperty(val) && !/^\d+$/.test(val)) {
				listToHold.push(val);
			}
		}
		);
		return listToHold;
	}

	findAllByCompanyId(companyId: number): Observable<Truck[]> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = environment.serverUrl + 'truck/findAllCompanyTrucks?companyId=' + companyId;
		options.method = RequestMethod.Post;
		let subject = new Subject<Truck[]>();
		this.http.request(new Request(options)).map((r: Response) => r.json())
			.subscribe((json: any[]) => {
				subject.next(json.map((item: any) => new Truck(item)))
			});
		return subject.asObservable();
	}

	list(): Observable<Truck[]> {
		let subject = new Subject<Truck[]>();
		this.http.get(this.baseUrl + 'truck')
			.map((r: Response) => r.json())
			.subscribe((json: any[]) => {
				subject.next(json.map((item: any) => new Truck(item)))
			});
		return subject.asObservable();
	}

	get(id: number): Observable<Truck> {
		const options = new RequestOptions();
		options.headers = this.getHeaderToken();
		options.url = this.baseUrl + 'truck/findTruckById?truckId=' + id;
		options.method = RequestMethod.Post;
		return this.http.request(new Request(options)).map((r: Response) => new Truck(r.json()));
	}

	save(truck: Truck): Observable<Truck> {
		const requestOptions = new RequestOptions();
		if (truck.id) {
			requestOptions.method = RequestMethod.Put;
			truck.updatedBy = this.loggedInUser;
			requestOptions.url = this.baseUrl + 'truck/' + truck.id;
		} else {
			truck.status = StatusType.INITIAL.toString();
			truck.createdBy = this.loggedInUser;
			truck.updatedBy = this.loggedInUser;
			requestOptions.method = RequestMethod.Post;
			requestOptions.url = this.baseUrl + 'truck';
		}
		requestOptions.body = JSON.stringify(truck);
		requestOptions.headers = this.getHeaderToken();

		return this.http.request(new Request(requestOptions))
			.map((r: Response) => new Truck(r.json()));
	}

	destroy(truck: Truck): Observable<boolean> {
		return this.http.delete(this.baseUrl + 'truck/' + truck.id).map((res: Response) => res.ok).catch(() => {
			return Observable.of(false);
		});
	}
}