import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Item} from './item';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ItemService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<Item[]> {
    let subject = new Subject<Item[]>();
    this.http.get(this.baseUrl + 'item')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Item(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Item> {
    return this.http.get(this.baseUrl + 'item/'+id)
      .map((r: Response) => new Item(r.json()));
  }

  save(item: Item): Observable<Item> {
    const requestOptions = new RequestOptions();
    if (item.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'item/' + item.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'item';
    }
    requestOptions.body = JSON.stringify(item);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Item(r.json()));
  }

  destroy(item: Item): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'item/' + item.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}