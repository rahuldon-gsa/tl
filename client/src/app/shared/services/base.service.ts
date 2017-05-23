import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, RequestMethod, Request, Response } from "@angular/http";
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'

@Injectable()
export class BaseService {

  constructor() { }
  
  getHeaderToken(): Headers {
    return new Headers({ "Content-Type": "application/json", "X-Auth-Token": sessionStorage.getItem('accessToken') });
  }

}
