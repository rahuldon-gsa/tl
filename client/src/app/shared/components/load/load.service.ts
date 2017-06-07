import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Load} from './load';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class LoadService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
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
    return this.http.get(this.baseUrl + 'load/'+id)
      .map((r: Response) => new Load(r.json()));
  }

  save(load: Load): Observable<Load> {
    const requestOptions = new RequestOptions();
    if (load.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'load/' + load.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'load';
    }
    requestOptions.body = JSON.stringify(load);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Load(r.json()));
  }

  destroy(load: Load): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'load/' + load.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}