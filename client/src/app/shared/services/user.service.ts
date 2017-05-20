import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../environments/environment';
import { User } from '../model/user';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class UserService {

  private baseUrl = environment.serverUrl;
  constructor(private http: Http) { }

  getUserInfo(username: string): Observable<User> {
    let headers = new Headers({ "Content-Type": "application/json", "X-Auth-Token": sessionStorage.getItem('accessToken') });
    const options = new RequestOptions();
    options.headers = headers;
    options.url = environment.serverUrl + 'user/findByUsername?username=admin';
    options.method = RequestMethod.Post;
    return this.http.request(new Request(options)).map((r: Response) => new User(r.json()));
  }

}
