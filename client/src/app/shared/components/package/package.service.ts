import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Package} from './package';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class PackageService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<Package[]> {
    let subject = new Subject<Package[]>();
    this.http.get(this.baseUrl + 'package')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Package(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Package> {
    return this.http.get(this.baseUrl + 'package/'+id)
      .map((r: Response) => new Package(r.json()));
  }

  save(package: Package): Observable<Package> {
    const requestOptions = new RequestOptions();
    if (package.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'package/' + package.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'package';
    }
    requestOptions.body = JSON.stringify(package);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Package(r.json()));
  }

  destroy(package: Package): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'package/' + package.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}