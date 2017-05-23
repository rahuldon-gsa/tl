import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, RequestMethod, Request, Response } from "@angular/http";
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import { BaseService } from '../../shared/services/base.service';

@Injectable()
export class AuthenticationService extends BaseService {

    message: string;

    constructor(private http: Http, private router: Router) {
        super();
    }

    authenticate(username: string, password: string) {
        const options = new RequestOptions();
        options.headers = new Headers({ 'Content-Type': 'application/json' });
        options.url = environment.serverUrl + 'api/login';
        options.body = JSON.stringify({ username: username, password: password });
        options.method = RequestMethod.Post;
        return this.http.request(new Request(options)).map((r: Response) => {

            // login successful if there's a jwt token in the response
            let user = r.json();
            if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('userRole', user.roles[0]);
                sessionStorage.setItem("accessToken", user.access_token);
            }
        });
    }

    logout(): Observable<boolean> {

        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('auth-message');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('firstName');
        sessionStorage.removeItem('lastName');

        sessionStorage.clear();
        return Observable.of(true);

    }
}