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

  findUserByName(username: string): Observable<any> {
 

    let headers = new Headers({ "Content-Type": "application/json", "Authorizatio": "Bearer " + sessionStorage.getItem('accessToken') });
    const options = new RequestOptions();
    options.headers = headers;
    options.url = environment.serverUrl + 'api/user/findByUsername';
    options.body = JSON.stringify({ username: username});
    options.method = RequestMethod.Post;

      return this.http.request(new Request(options)).map((r: Response) => {
        alert(r.json());
      });
 
  }

}
