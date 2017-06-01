import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Trailer} from './trailer';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class TrailerService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
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
    return this.http.get(this.baseUrl + 'trailer/'+id)
      .map((r: Response) => new Trailer(r.json()));
  }

  save(trailer: Trailer): Observable<Trailer> {
    const requestOptions = new RequestOptions();
    if (trailer.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'trailer/' + trailer.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'trailer';
    }
    requestOptions.body = JSON.stringify(trailer);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Trailer(r.json()));
  }

  destroy(trailer: Trailer): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'trailer/' + trailer.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}